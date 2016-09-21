// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Legend from './Legend';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.DISTRIBUTION;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 200;

const SMALL_SIZE = 120;
const THIN_HEIGHT = 72;

const GUTTER_SIZE = 4;
// We pad the labels here instead of CSS to keep the DOM simple for handling
// text overflow.
const LABEL_PAD_VERTICAL = 6;
const LABEL_PAD_HORIZONTAL = 12;

export default class Distribution extends Component {

  constructor(props, context) {
    super(props, context);

    this._onEnter = this._onEnter.bind(this);
    this._onPreviousDistribution = this._onPreviousDistribution.bind(this);
    this._onNextDistribution = this._onNextDistribution.bind(this);
    this._onActivate = this._onActivate.bind(this);
    this._onDeactivate = this._onDeactivate.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._placeItems = this._placeItems.bind(this);

    this.state = this._stateFromProps(props);
    this.state.legendPosition = 'bottom';
    this.state.width = DEFAULT_WIDTH;
    this.state.height = DEFAULT_HEIGHT;
    this.state.activeIndex = 0;
  }

  componentDidMount () {
    this._keyboardHandlers = {
      left: this._onPreviousDistribution,
      up: this._onPreviousDistribution,
      right: this._onNextDistribution,
      down: this._onNextDistribution,
      enter: this._onEnter,
      space: this._onEnter
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );

    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps);
    // preserve width and height we calculated already
    state.width = this.state.width;
    state.height = this.state.height;
    // _layout is only needed if the component area changes, just place items
    this.setState(state, this._placeItems);
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );

    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  }

  _seriesTotal (series) {
    let total = 0;
    series.some(function (datum) {
      total += datum.value;
    });
    return total;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    let total;
    let allIcons = false;
    if (props.series) {
      total = this._seriesTotal(props.series);
      allIcons = ! props.series.some((datum) => {
        return ! datum.icon;
      });
    } else {
      total = 100;
    }

    return {
      allIcons: allIcons,
      total: total
    };
  }

  _boxRect (itemRect, width, height) {
    // leave a gutter between items, if we're not at the edge
    let boxRect = { ...itemRect };
    if (0 !== boxRect.x &&
      width > (boxRect.x + boxRect.width)) {
      boxRect.x += (GUTTER_SIZE / 2);
      boxRect.width -= GUTTER_SIZE;
    }
    if (0 !== boxRect.y &&
      height > (boxRect.y + boxRect.height)) {
      boxRect.y += (GUTTER_SIZE / 2);
      boxRect.height -= GUTTER_SIZE;
    }
    boxRect.width -= GUTTER_SIZE;
    boxRect.height -= GUTTER_SIZE;
    // flush the right edge
    if (boxRect.x + boxRect.width > width - (2 * GUTTER_SIZE)) {
      boxRect.width = width - boxRect.x;
    }
    // flush the bottom edge
    if (boxRect.y + boxRect.height > height - (2 * GUTTER_SIZE)) {
      boxRect.height = height - boxRect.y;
    }
    return boxRect;
  }

  _labelRect (boxRect) {
    // pad the labels here to keep the DOM simple w.r.t overflow text
    let labelRect = { ...boxRect };
    labelRect.x += LABEL_PAD_HORIZONTAL;
    labelRect.width -= (LABEL_PAD_HORIZONTAL * 2);
    labelRect.y += LABEL_PAD_VERTICAL;
    labelRect.height -= (LABEL_PAD_VERTICAL * 2);
    return labelRect;
  }

  _placeItems () {
    const width = this.state.width;
    const height = this.state.height;
    const areaPer = (width * height) / this.state.total;
    let remainingRect = { x: 0, y: 0, width: width, height: height };
    let items = [];
    let series = (this.props.series ? this.props.series.slice(0) : []);

    while (series.length > 0) {
      const datum = series.shift();
      if (datum.value <= 0) {
        continue;
      }

      // Start a new group.
      let groupValue = datum.value;
      let targetGroupValue;

      // Make the first item as square as possible.
      const itemArea = areaPer * datum.value;
      const edgeLength = Math.round(Math.sqrt(itemArea));
      let itemHeight;
      let itemWidth;

      // Figure out how much value we can fit inside a rectangle
      // that takes the full minor axis length
      if (remainingRect.width > remainingRect.height) {
        // landscape, lay out left to right
        itemHeight = Math.min(remainingRect.height, edgeLength);
        itemWidth = Math.round(itemArea / itemHeight);
        targetGroupValue =
          Math.round((itemWidth * remainingRect.height) / areaPer);
      } else {
        // portrait, lay out top to bottom
        itemWidth = Math.min(remainingRect.width, edgeLength);
        itemHeight = Math.round(itemArea / itemWidth);
        targetGroupValue =
          Math.round((itemHeight * remainingRect.width) / areaPer);
      }

      // Group items until we reach the target group value.
      let group = [datum];
      while (groupValue < targetGroupValue && series.length > 0) {
        const datum2 = series.shift();
        groupValue += datum2.value;
        group.push(datum2);
      }

      // Now that we know the actual value of the group, give it a
      // rectangle whose area corresponds to the actual group value.
      let groupRect;
      if (remainingRect.width > remainingRect.height) {
        // landscape, lay out left to right
        groupRect = { x: remainingRect.x, y: remainingRect.y,
          width: Math.round((areaPer * groupValue) / remainingRect.height),
          height: remainingRect.height };
        remainingRect.x += groupRect.width;
        remainingRect.width -= groupRect.width;
      } else {
        // portrait, lay out top to bottom
        groupRect = { x: remainingRect.x, y: remainingRect.y,
          width: remainingRect.width,
          height: Math.round((areaPer * groupValue) / remainingRect.width) };
        remainingRect.y += groupRect.height;
        remainingRect.height -= groupRect.height;
      }

      // Place items within the group rectangle.
      // We take the full minor axis length and as much major axis length
      // as needed to match the item's area.
      group.forEach((datum) => {
        let itemRect;
        if (groupRect.width > groupRect.height) {
          // landscape, use full height
          itemRect = { x: groupRect.x, y: groupRect.y,
            width: Math.round((areaPer * datum.value) / groupRect.height),
            height: groupRect.height };
          groupRect.x += itemRect.width;
          groupRect.width -= itemRect.width;
        } else {
          // portrait, use full width
          itemRect = { x: groupRect.x, y: groupRect.y,
            width: groupRect.width,
            height: Math.round((areaPer * datum.value) / groupRect.width) };
          groupRect.y += itemRect.height;
          groupRect.height -= itemRect.height;
        }

        let boxRect = this._boxRect(itemRect, width, height);
        let labelRect = this._labelRect(boxRect);

        // Save this so we can render the item's box and label
        // in the correct location.

        items.push({ datum: datum, rect: itemRect,
          boxRect: boxRect, labelRect: labelRect });
      });
    }

    this.setState({ items: items });
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    // legendPosition based on available window orientation
    let ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.8) {
      this.setState({legendPosition: 'bottom'});
    } else if (ratio > 1.2) {
      this.setState({legendPosition: 'right'});
    }

    const container = this.containerRef;
    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width !== this.state.width || height !== this.state.height ||
      ! this.state.items) {
      this.setState({
        width: width,
        height: height
      }, this._placeItems);
    }
  }

  _itemColorIndex (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  }

  _onPreviousDistribution (event) {
    if (document.activeElement === this.distributionRef) {
      event.preventDefault();
      var totalDistributionCount = (
        ReactDOM.findDOMNode(this.distributionItemsRef).childNodes.length
      );

      if (this.state.activeIndex - 1 < 0) {
        this._onActivate(totalDistributionCount - 1);
      } else {
        this._onActivate(this.state.activeIndex - 1);
      }

      //stop event propagation
      return true;
    }
  }

  _onNextDistribution (event) {
    if (document.activeElement === this.distributionRef) {
      event.preventDefault();
      var totalDistributionCount = (
        ReactDOM.findDOMNode(this.distributionItemsRef).childNodes.length
      );

      if (this.state.activeIndex + 1 >= totalDistributionCount) {
        this._onActivate(0);
      } else {
        this._onActivate(this.state.activeIndex + 1);
      }

      //stop event propagation
      return true;
    }
  }

  _onEnter (event) {
    if (document.activeElement === this.distributionRef) {
      if (this.activeDistributionRef) {
        let index = this.activeDistributionRef.getAttribute('data-index');

        let activeDistribution = this.props.series.filter(function(item) {
          return item.value > 0;
        })[index];

        //trigger click on active distribution
        if (activeDistribution.onClick) {
          activeDistribution.onClick();
        }
      }
    }
  }

  _onActivate (index) {
    this.setState({activeIndex: index});
  }

  _onDeactivate () {
    this.setState({activeIndex: 0});
  }

  _renderLegend () {
    return (
      <Legend ref={ref => this.legendRef = ref}
        className={CLASS_ROOT + "__legend"} series={this.props.series}
        units={this.props.units} activeIndex={this.state.activeIndex}
        onActive={this._onActivate} />
    );
  }

  _renderItemLabel (datum, labelRect, index) {
    let labelClasses = [`${CLASS_ROOT}__label`];
    if (! datum.icon) {
      labelClasses.push(`${COLOR_INDEX}-${this._itemColorIndex(datum, index)}`);
    }
    if (datum.icon) {
      labelClasses.push(`${CLASS_ROOT}__label--icons`);
    }
    if (labelRect.width < SMALL_SIZE || labelRect.height < SMALL_SIZE) {
      labelClasses.push(`${CLASS_ROOT}__label--small`);
    }
    if (labelRect.height < THIN_HEIGHT) {
      labelClasses.push(`${CLASS_ROOT}__label--thin`);
    }

    if (index === this.state.activeIndex) {
      labelClasses.push(`${CLASS_ROOT}__label--active`);
    }

    const value =
      (datum.labelValue !== undefined ? datum.labelValue : datum.value);

    return (
      <div key={index} className={labelClasses.join(' ')}
        data-box-index={index} role="tab"
        style={{ top: labelRect.y, left: labelRect.x, maxWidth: labelRect.width,
          maxHeight: labelRect.height }}
        id={`${this.props.a11yTitleId}_item_${index}`}>
        <span className={`${CLASS_ROOT}__label-value`}>
          {value}
          <span className={`${CLASS_ROOT}__label-units`}>
            {this.props.units}
          </span>
        </span>
        <span className={`${CLASS_ROOT}__label-label`}>
          {datum.label}
        </span>
      </div>
    );
  }

  _renderItemBox (boxRect, colorIndex) {
    let boxClasses = [`${CLASS_ROOT}__item-box`];
    if (colorIndex) {
      boxClasses.push(`${COLOR_INDEX}-${colorIndex}`);
    }

    return (
      <rect className={boxClasses.join(' ')}
        x={boxRect.x} y={boxRect.y}
        width={boxRect.width} height={boxRect.height} />
    );
  }

  _renderItemIcon (icon, itemRect, colorIndex) {
    let iconClasses = [`${CLASS_ROOT}__item-icons`];
    iconClasses.push(`${COLOR_INDEX}-${colorIndex}`);

    let icons = [];
    // fill box with icons
    let iconX = 0;
    let iconY = 0;
    let iconIndex = 1;

    while (iconY < (itemRect.height - icon.height)) {
      while (iconX < (itemRect.width - icon.width)) {
        let transform = (
          `translate(${itemRect.x + iconX}, ${itemRect.y + iconY})`
        );
        icons.push(
          <g key={iconIndex} transform={transform}>
            {icon.svgElement}
          </g>
        );
        iconX += icon.width;
        iconIndex += 1;
      }
      iconY += icon.height;
      iconX = 0;
    }

    return (
      <g className={iconClasses.join(' ')}>
        {icons}
      </g>
    );
  }

  _renderItem (datum, rect, index) {
    let itemClass = `${CLASS_ROOT}__item`;
    let itemClasses = [itemClass];

    if (datum.onClick) {
      itemClasses.push(`${itemClass}--clickable`);
    }

    let activeDistributionRef;
    if (index === this.state.activeIndex) {
      activeDistributionRef = (ref) => this.activeDistributionRef = ref;
    }

    let colorIndex = this._itemColorIndex(datum, index);

    let contents;
    if (datum.icon) {
      contents = this._renderItemIcon(datum.icon, rect, colorIndex);
    } else {
      contents = this._renderItemBox(rect, colorIndex);
    }

    return (
      <g key={index} className={itemClasses.join(' ')}
        onMouseOver={this._onActivate.bind(this, index)}
        onMouseLeave={this._onDeactivate}
        ref={activeDistributionRef} role="presentation"
        data-index={index} onClick={datum.onClick}>
        {contents}
      </g>
    );
  }

  _renderBoxes () {
    return this.state.items.map((item, index) => {
      return this._renderItem(item.datum, item.boxRect, index);
    }, this);
  }

  _renderLabels () {
    return this.state.items.map((item, index) => {
      return this._renderItemLabel(item.datum, item.labelRect, index);
    }, this);
  }

  _renderLoading () {
    let loadingClasses = [`${CLASS_ROOT}__loading-indicator`];
    loadingClasses.push(`${COLOR_INDEX}-loading`);
    let loadingHeight = this.state.height / 2;
    let loadingWidth = this.state.width;
    let commands = `M0,${loadingHeight} L${loadingWidth},${loadingHeight}`;

    return (
      <g key="loading">
        <path stroke="none" className={loadingClasses.join(' ')} d={commands} />
      </g>
    );
  }

  render () {
    let classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--legend-${this.state.legendPosition}`);
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.full) {
      classes.push(`${CLASS_ROOT}--full`);
    }
    if (this.props.vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (this.state.allIcons) {
      classes.push(`${CLASS_ROOT}--icons`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let legend;
    if (this.props.legend) {
      console.warn(
        'Distribution: legend prop has been deprecated. ' +
        'Use a separate Legend instead.'
      );
      legend = this._renderLegend();
    }

    let background;
    if (! this.state.allIcons) {
      background = (
        <rect className={`${CLASS_ROOT}__background`} x={0} y={0} stroke="none"
          width={this.state.width} height={this.state.height} />
      );
    }

    let boxes = [];
    let labels;
    if (this.state.items) {
      boxes = this._renderBoxes();
      labels = this._renderLabels();
    }

    let role = 'tablist';
    let a11yTitle = (
      this.props.a11yTitle ||
      Intl.getMessage(this.context.intl, 'Distribution')
    );

    if (boxes.length === 0) {
      classes.push(`${CLASS_ROOT}--loading`);
      boxes.push(this._renderLoading());
      role = 'img';
      a11yTitle = Intl.getMessage(this.context.intl, 'Loading');
    }

    let activeDescendant;
    if (this.state.activeIndex >= 0) {
      activeDescendant =
        `${this.props.a11yTitleId}_item_${this.state.activeIndex}`;
    }

    let a11yTitleNode = (
      <title id={this.props.a11yTitleId}>{a11yTitle}</title>
    );

    let a11yDescNode;
    if (this.props.a11yDesc) {
      a11yDescNode = (
        <desc id={this.props.a11yDescId}>
          {this.props.a11yDesc}
        </desc>
      );
    }

    return (
      <div ref={ref => this.containerRef = ref} className={classes.join(' ')}>
        <svg ref={ref => this.distributionRef = ref}
          className={`${CLASS_ROOT}__graphic`}
          viewBox={`0 0 ${this.state.width} ${this.state.height}`}
          preserveAspectRatio="none" tabIndex="0" role={role}
          aria-activedescendant={activeDescendant}
          aria-labelledby={this.props.a11yTitleId + ' ' +
            this.props.a11yDescId}>
          {background}
          {a11yTitleNode}
          {a11yDescNode}
          {boxes}
        </svg>
        <div ref={ref => this.distributionItemsRef = ref}
          className={`${CLASS_ROOT}__labels`}>
          {labels}
        </div>
        {legend}
      </div>
    );
  }

}

Distribution.contextTypes = {
  intl: PropTypes.object
};

Distribution.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  a11yDesc: PropTypes.string,
  full: PropTypes.bool,
  legend: PropTypes.bool, // remove in 1.0
  legendTotal: PropTypes.bool, // remove in 1.0
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func,
    icon: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      svgElement: PropTypes.node
    })
  })),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  units: PropTypes.string,
  vertical: PropTypes.bool
};

Distribution.defaultProps = {
  a11yTitleId: 'distribution-title',
  a11yDescId: 'distribution-desc'
};
