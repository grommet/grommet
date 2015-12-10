// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import {classRoot, propTypes, buildPath} from './utils';

const CLASS_ROOT = classRoot;

class Graphic extends Component {

  constructor(props) {
    super();
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
  }

  // override
  _stateFromProps (props) {
    return {};
  }

  // override
  _sliceCommands (trackIndex, item, startValue) {
    return "";
  }

  _renderSlice (trackIndex, item, itemIndex, startValue) {
    var classes = [CLASS_ROOT + "__slice"];
    if (itemIndex === this.props.activeIndex) {
      classes.push(CLASS_ROOT + "__slice--active");
    }
    classes.push("color-index-" + item.colorIndex);

    var commands = this._sliceCommands(trackIndex, item, startValue);

    var path = buildPath(itemIndex, commands, classes,
      this.props.onActivate, item.onClick, this.props.a11yDescId);

    return path;
  }

  _renderTrack (series, trackIndex) {
    var startValue = this.props.min.value;

    var paths = series.map(function (item, itemIndex) {
      var path = this._renderSlice(trackIndex, item, itemIndex, startValue);
      startValue += item.value;
      return path;
    }, this);

    return paths;
  }

  _loadingCommands () {
    return this._sliceCommands(0, this.props.max, this.props.min.value);
  }

  _renderLoading () {
    var classes = [CLASS_ROOT + "__slice"];
    classes.push(CLASS_ROOT + "__slice--loading");
    classes.push("color-index-loading");
    var commands = this._loadingCommands();
    return [
      <path key="loading" className={classes.join(' ')} d={commands} />
    ];
  }

  _renderValues () {
    var values;
    if (this.props.stacked) {
      values = this._renderTrack(this.props.series, 0);
    } else {
      values = this.props.series.map((item, index) => {
        return this._renderSlice(index, item, index, this.props.min.value);
      });
    }
    if (values.length === 0) {
      values = this._renderLoading();
    }
    return (
      <g className={CLASS_ROOT + "__values"}>
        {values}
      </g>
    );
  }

  _renderThresholds () {
    var result;
    var thresholds;
    if (this.props.stacked) {
      thresholds = this._renderTrack(this.props.thresholds, 0);
    } else {
      thresholds = this.props.series.map((item, index) => {
        return this._renderTrack(this.props.thresholds, index);
      });
    }
    if (thresholds.length > 0) {
      result = (
        <g className={CLASS_ROOT + "__thresholds"}>
          {thresholds}
        </g>
      );
    }
    return result;
  }

  _renderTopLayer () {
    return null;
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var values = this._renderValues();
    var thresholds = this._renderThresholds();
    var topLayer = this._renderTopLayer();

    return (
      <svg className={CLASS_ROOT + "__graphic"}
        width={this.props.vertical ? null : this.state.viewBoxWidth}
        height={this.props.vertical ? this.state.viewBoxHeight : null}
        viewBox={"0 0 " + this.state.viewBoxWidth +
          " " + this.state.viewBoxHeight}
        preserveAspectRatio="xMidYMid meet">
        <desc id={this.props.a11yDescId}>{this.props.a11yDesc}</desc>
        {thresholds}
        {values}
        {topLayer}
      </svg>
    );
  }
}

Graphic.propTypes = {
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

module.exports = Graphic;
