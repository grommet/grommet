// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { classRoot, propTypes, buildPath } from './utils';
import Intl from '../../utils/Intl';
import KeyboardAccelerators from '../../utils/KeyboardAccelerators';

const CLASS_ROOT = classRoot;

export default class Graphic extends Component {

  constructor(props) {
    super();
    this.state = this._stateFromProps(props);

    this._onEnter = this._onEnter.bind(this);
    this._onRequestForNextLegend = this._onRequestForNextLegend.bind(this);
    this._onRequestForPreviousLegend = this._onRequestForPreviousLegend.bind(this);
  }

  componentDidMount () {
    this._keyboardHandlers = {
      left: this._onRequestForPreviousLegend,
      up: this._onRequestForPreviousLegend,
      right: this._onRequestForNextLegend,
      down: this._onRequestForNextLegend,
      enter: this._onEnter,
      space: this._onEnter
    };
    KeyboardAccelerators.startListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps);
    this.setState(state);
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
  }

  // override
  _stateFromProps (props) {
    return {};
  }

  // override
  _sliceCommands (trackIndex, item, startValue) {
    return "";
  }

  _renderSlice (trackIndex, item, itemIndex, startValue, threshold) {
    let path;
    if (! item.hidden) {
      let classes = [`${CLASS_ROOT}__slice`];
      let activeMeterSlice;
      if (itemIndex === this.props.activeIndex) {
        activeMeterSlice = 'activeMeterSlice';
        classes.push(`${CLASS_ROOT}__slice--active`);
      }

      if (item.onClick) {
        classes.push(CLASS_ROOT + "__slice--clickable");
      }

      classes.push(`color-index-${item.colorIndex}`);

      let commands = this._sliceCommands(trackIndex, item, startValue);

      if (threshold) {
        path = buildPath(itemIndex, commands, classes,
          this.props.onActivate, item.onClick);
      } else {
        let a11yDescId = `${this.props.a11yDescId}_${itemIndex}`;
        let a11yTitle = `${item.value} ${item.label || this.props.units || ''}`;

        path = buildPath(itemIndex, commands, classes,
          this.props.onActivate, item.onClick, a11yDescId,
          a11yTitle, activeMeterSlice);
      }
    }

    return path;
  }

  _renderSlices (series, trackIndex, threshold) {
    let startValue = this.props.min.value;

    let paths = series.map(function (item, itemIndex) {
      let path = this._renderSlice(trackIndex, item, itemIndex, startValue, threshold);
      startValue += item.value;
      return path;
    }, this);

    return paths;
  }

  _loadingCommands () {
    return this._sliceCommands(0, this.props.max, this.props.min.value);
  }

  _onRequestForPreviousLegend (event) {
    if (document.activeElement === this.refs.meter) {
      event.preventDefault();
      var totalValueCount = (
        ReactDOM.findDOMNode(this.refs.meterValues).childNodes.length
      );

      if (this.props.activeIndex - 1 < 0) {
        this.props.onActivate(totalValueCount - 1);
      } else {
        this.props.onActivate(this.props.activeIndex - 1);
      }

      //stop event propagation
      return true;
    }
  }

  _onRequestForNextLegend (event) {
    if (document.activeElement === this.refs.meter) {
      event.preventDefault();
      var totalValueCount = (
        ReactDOM.findDOMNode(this.refs.meterValues).childNodes.length
      );

      if (this.props.activeIndex + 1 >= totalValueCount) {
        this.props.onActivate(0);
      } else {
        this.props.onActivate(this.props.activeIndex + 1);
      }

      //stop event propagation
      return true;
    }
  }

  _onEnter (event) {
    if (document.activeElement === this.refs.meter) {
      if (this.refs.activeMeterSlice) {
        let index = this.refs.activeMeterSlice.getAttribute('data-index');

        //trigger click on active meter slice
        if (this.props.series[index].onClick) {
          this.props.series[index].onClick();
        }
      }
    }
  }

  _renderLoading () {
    let classes = [`${CLASS_ROOT}__slice`];
    classes.push(`${CLASS_ROOT}__slice--loading`);
    classes.push("color-index-loading");
    let commands = this._loadingCommands();
    return [
      <path key="loading" className={classes.join(' ')} d={commands} />
    ];
  }

  _renderValues () {
    let values;
    if (this.props.stacked) {
      values = this._renderSlices(this.props.series, 0);
    } else {
      values = this.props.series.map((item, index) => {
        return this._renderSlice(index, item, index, this.props.min.value);
      });
    }
    if (values.length === 0) {
      values = this._renderLoading();
    }
    return (
      <g ref="meterValues" className={`${CLASS_ROOT}__values`}>
        {values}
      </g>
    );
  }

  _renderTracks () {
    const trackValue = { value: this.props.max.value, colorIndex: 'unset' };
    let tracks;
    if (this.props.stacked) {
      tracks = this._renderSlice(0, trackValue, 0, this.props.min.value, true);
    } else {
      tracks = this.props.series.map((item, index) => {
        return this._renderSlice(index, trackValue, index, this.props.min.value, true);
      });
    }
    return (
      <g className={`${CLASS_ROOT}__tracks`}>
        {tracks}
      </g>
    );
  }

  _renderThresholds () {
    let result;
    let thresholds = this._renderSlices(this.props.thresholds, -0.4, true);
    if (thresholds.length > 0) {
      result = (
        <g className={`${CLASS_ROOT}__thresholds`}>
          {thresholds}
        </g>
      );
    }
    return result;
  }

  _renderTotal () {
    return this.props.series.map((s) => s.value)
      .reduce((prev, curr) => prev + curr, 0);
  }

  _renderTopLayer () {
    return null;
  }

  _renderInlineLegend () {
    return null;
  }

  _renderA11YTitle () {
    let a11yTitle = this.props.a11yTitle;
    if (!a11yTitle) {
      let graphicTitle = Intl.getMessage(
        this.context.intl, this.displayName
      );
      let meterTitle = Intl.getMessage(this.context.intl, 'Meter');

      a11yTitle = `${graphicTitle} ${meterTitle}`;
    }

    return a11yTitle;
  }

  _renderA11YDesc () {
    let a11yDesc = this.props.a11yDesc;
    let units = this.props.units || '';
    if (!a11yDesc) {
      let valueLabel = Intl.getMessage(this.context.intl, 'Value');
      a11yDesc = `, ${valueLabel}: ${this._renderTotal()} ${units}`;

      if (this.props.min) {
        let minLabel = Intl.getMessage(this.context.intl, 'Min');
        a11yDesc += `, ${minLabel}: ${this.props.min.value} ${units}`;
      }

      if (this.props.max) {
        let maxLabel = Intl.getMessage(this.context.intl, 'Max');
        a11yDesc += `, ${maxLabel}: ${this.props.max.value} ${units}`;
      }

      if (this.props.thresholds) {
        let thresholdLabel = Intl.getMessage(this.context.intl, 'Threshold');
        this.props.thresholds.forEach((threshold) => {
          if (threshold.ariaLabel) {
            a11yDesc += `, ${thresholdLabel}: ${threshold.ariaLabel}`;
          }
        });
      }
    }

    return a11yDesc;
  }

  render () {
    let classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let tracks = this._renderTracks();
    let values = this._renderValues();
    let thresholds = this._renderThresholds();
    let topLayer = this._renderTopLayer();
    let inlineLegend = this._renderInlineLegend();

    let a11yTitle = this._renderA11YTitle();
    let a11yDesc = this._renderA11YDesc();

    let activeDescendant = `${this.props.a11yDescId}_${this.props.activeIndex || 0}`;

    return (
      <svg ref="meter" className={`${CLASS_ROOT}__graphic`}
        tabIndex="0" role={this.props.a11yRole}
        width={this.state.viewBoxWidth}
        height={this.state.viewBoxHeight}
        viewBox={"0 0 " + this.state.viewBoxWidth +
          " " + this.state.viewBoxHeight}
        preserveAspectRatio="xMidYMid meet"
        aria-activedescendant={activeDescendant}
        aria-labelledby={this.props.a11yTitleId + ' ' + this.props.a11yDescId}>
        <title id={this.props.a11yTitleId}>
          {a11yTitle}
        </title>
        <desc id={this.props.a11yDescId}>{a11yDesc}</desc>
        {tracks}
        {thresholds}
        {values}
        {inlineLegend}
        {topLayer}
      </svg>
    );
  }
}

Graphic.propTypes = {
  a11yRole: PropTypes.string,
  stacked: PropTypes.bool,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })).isRequired,
  vertical: PropTypes.bool,
  ...propTypes
};

Graphic.contextTypes = {
  intl: PropTypes.object
};

Graphic.defaultProps = {
  a11yRole: 'img'
};
