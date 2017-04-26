// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { padding } from './utils';
import CSSClassnames from '../../utils/CSSClassnames';
import Intl from '../../utils/Intl';
import KeyboardAccelerators from '../../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.CHART_HOT_SPOTS;

// Interactive regions.

export default class HotSpots extends Component {

  constructor () {
    super();
    this._onPreviousHotSpot = this._onPreviousHotSpot.bind(this);
    this._onNextHotSpot = this._onNextHotSpot.bind(this);
    this._onHotSpotFocus = this._onHotSpotFocus.bind(this);
    this._onHotSpotBlur = this._onHotSpotBlur.bind(this);
    this._onHotSpotClick = this._onHotSpotClick.bind(this);
    this._mergeValues = this._mergeValues.bind(this);
    this._calculateHotSpotWidths = this._calculateHotSpotWidths.bind(this);
    this._makeHotspotToIndexMapping = this._makeHotspotToIndexMapping
      .bind(this);
    this.state = { percentBasis: undefined, hotspotToIndexMapping: undefined };
  }

  componentWillMount() {
    if(this.props.normalizedValues) {
      const mergedNormalizedValues = this._mergeValues(
        this.props.normalizedValues
      );
      const percentBasis = this._calculateHotSpotWidths(
        mergedNormalizedValues
      );
      const hotspotToIndexMapping = this._makeHotspotToIndexMapping(
        mergedNormalizedValues, percentBasis
      );
      this.setState({
        ...this.state,
        percentBasis: percentBasis,
        hotspotToIndexMapping: hotspotToIndexMapping
      });
    }
  }

  // Skips the lengthy operations of merging normalizedValues and
  // calculating hotspot widths, if nextProps.normalizedValues are
  // the same as this.props.normalizedValues.
  componentWillReceiveProps(nextProps) {
    if(!this.props.normalizedValues || !nextProps.normalizedValues ||
      nextProps.normalizedValues === this.props.normalizedValues) {
      return;
    }
    let isSameSize = false, hasSameElements = false;
    isSameSize = this.props.normalizedValues.every((arr, i) => {
      return nextProps.normalizedValues[i] &&
       arr.length == nextProps.normalizedValues[i].length;
    });
    if(isSameSize) {
      hasSameElements = this.props.normalizedValues.every((arr, i) => {
        return arr.every((val, j) => {
          return val === nextProps.normalizedValues[i][j];
        });
      });
    }
    if(!isSameSize || !hasSameElements) {
      const mergedNormalizedValues = this._mergeValues(
        nextProps.normalizedValues
      );
      const percentBasis = this._calculateHotSpotWidths(
        mergedNormalizedValues
      );
      const hotspotToIndexMapping = this._makeHotspotToIndexMapping(
        mergedNormalizedValues, percentBasis
      );
      this.setState({
        ...this.state,
        percentBasis: percentBasis,
        hotspotToIndexMapping: hotspotToIndexMapping
      });
    }
  }

  // Finds the longest array of data points for a graph
  // and attempts to replace its undefined indexes with
  // the numeric values found at the same index
  // in other arrays of points found in the normalizedValues object
  // in order to generate a cohesive list
  // of all the data points which require hotspots.
  _mergeValues(normalizedValues) {
    return normalizedValues.sort((a,b) => a.length < b.length)[0]
      .map((currVal, i) => {
        if(currVal !== undefined) {
          return currVal;
        } else {
          return normalizedValues.reduce((mappedVal, currDataSet) => {
            return currDataSet[i] !== undefined ? currDataSet[i] : mappedVal;
          }, undefined);
        }
      });
  }

  // Calculates a percentage based representation of the width
  // of HotSpots's divs.
  // The width of the divs are calculated more precisely by extending the width
  // of divs representing data point values if there are neighboring
  // undefined values surrounding the data point
  _calculateHotSpotWidths(mergedNormalizedValues) {
    const singlePointBasis = 100 / (mergedNormalizedValues.length - 1);
    const widths = [];
    let currentWidth = 0, currentBetweenWidth = 0, totalWidth = 0;

    for (let index = 0; index < mergedNormalizedValues.length; index += 1) {
      let newBasis;
      if (index === 0 || index === (mergedNormalizedValues.length - 1)) {
        newBasis = singlePointBasis / 2;
      } else {
        newBasis = singlePointBasis;
      }
      if (mergedNormalizedValues[index] !== undefined) {
        if (currentWidth > 0) {
          widths.push(currentWidth + (currentBetweenWidth / 2));
          totalWidth += currentWidth + (currentBetweenWidth / 2);
          currentWidth = (currentBetweenWidth / 2) + newBasis;
        } else {
          // This can only be hit on the first defined point on the chart
          // for this point, we want to include all previous between width
          // and to not push any previous point on to the list
          currentWidth = currentBetweenWidth + newBasis;
        }
        // once you have split the width of the undefined points between the
        // previous point and the new point, reset between width to 0
        currentBetweenWidth = 0;
      } else {
        currentBetweenWidth += newBasis;
      }
    }

    if (currentWidth > 0) {
      widths.push(100 - totalWidth);
    }
    return widths;
  }

  _makeHotspotToIndexMapping(mergedNormalizedValues, percentBasis) {
    const hotspotToIndexMapping = new Map();
    let lastHotspotIndex = 0, undefinedCount = 0;

    mergedNormalizedValues.forEach((val, index) => {
      if(val == undefined) {
        undefinedCount++;
        if(index < mergedNormalizedValues.length - 1
          && mergedNormalizedValues[index + 1] != undefined) {
          hotspotToIndexMapping.set(
            lastHotspotIndex, lastHotspotIndex + undefinedCount
          );
        }
      } else {
        lastHotspotIndex++;
      }
    });
    return hotspotToIndexMapping;
  }

  _onHotSpotFocus () {
    this._keyboardHandlers = {
      left: this._onPreviousHotSpot,
      up: this._onPreviousHotSpot,
      right: this._onNextHotSpot,
      down: this._onNextHotSpot,
      enter: this._onHotSpotClick
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _onHotSpotBlur () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  _onPreviousHotSpot (event) {
    event.preventDefault();
    const { activeIndex, onActive } = this.props;
    const previousIndex = activeIndex - 1;
    if (previousIndex >= 0) {
      onActive(previousIndex);
    }
    //stop event propagation
    return true;
  }

  _onNextHotSpot (event) {
    event.preventDefault();
    const { activeIndex, count, onActive } = this.props;
    const nextIndex = activeIndex + 1;
    if (nextIndex < count) {
      onActive(nextIndex);
    }
    //stop event propagation
    return true;
  }

  _onHotSpotClick () {
    const { activeIndex, onClick } = this.props;

    if (activeIndex !== undefined && onClick) {
      onClick(activeIndex);
    }
  }

  render () {
    const {
      a11yTitle, activeIndex, className, count, onActive, onClick, vertical,
      ...props
    } = this.props;
    delete props.height;
    delete props.width;

    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--clickable`]: onClick
      },
      className
    );

    const defaultBasis = 100 / (count - 1);
    let items = [];
    let percentBasis = this.state.percentBasis;
    const maxIndex = percentBasis ? percentBasis.length : count;
    for (let index = 0; index < maxIndex; index += 1) {
      const bandClasses = classnames(
        `${CLASS_ROOT}__band`,
        {
          [`${CLASS_ROOT}__band--active`]: index === activeIndex
        }
      );
      let basis = percentBasis ? percentBasis[index] : defaultBasis;
      if (!percentBasis && (0 === index || index === (count - 1))) {
        basis = defaultBasis / 2;
      }
      const style = { flexBasis: `${basis}%` };
      let mappedIndex = this.state.hotspotToIndexMapping ?
        this.state.hotspotToIndexMapping.get(index) : index;
      items.push(
        <div key={index} className={bandClasses} style={style}
          role={onClick ? 'button' : 'row'}
          aria-label={a11yTitle}
          onMouseOver={onActive ? () => onActive(mappedIndex) : undefined}
          onMouseOut={onActive ? () => onActive(undefined) : undefined}
          onClick={onClick ? () => onClick(mappedIndex) : undefined} />
      );
    }

    const hotSpotsLabel = Intl.getMessage(intl, 'HotSpotsLabel');

    return (
      <div {...props} className={classes} style={{ padding: padding }}
        tabIndex='0' onFocus={this._onHotSpotFocus}
        onBlur={this._onHotSpotBlur} role='group'
        aria-label={hotSpotsLabel}>
        {items}
      </div>
    );
  }

}

HotSpots.contextTypes = {
  intl: PropTypes.object
};

HotSpots.propTypes = {
  a11yTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onActive: PropTypes.func,
  onClick: PropTypes.func,
  vertical: PropTypes.bool,
  normalizedValues: PropTypes.array
};
