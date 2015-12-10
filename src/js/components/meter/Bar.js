// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {baseUnit, baseDimension} from './utils';
import Graphic from './Graphic';

const BAR_LENGTH = baseDimension;
const BAR_THICKNESS = baseUnit;
const MID_BAR_THICKNESS = BAR_THICKNESS / 2;

class Bar extends Graphic {

  _viewBoxDimensions (props) {
    var viewBoxHeight;
    var viewBoxWidth;
    if (props.vertical) {
      if (props.stacked) {
        viewBoxWidth = BAR_THICKNESS;
      } else {
        viewBoxWidth = BAR_THICKNESS * Math.max(1, props.series.length);
      }
      viewBoxHeight = BAR_LENGTH;
    } else {
      viewBoxWidth = BAR_LENGTH;
      if (props.stacked) {
        viewBoxHeight = BAR_THICKNESS;
      } else {
        viewBoxHeight = BAR_THICKNESS * Math.max(1, props.series.length);
      }
    }
    return [viewBoxWidth, viewBoxHeight];
  }

  _stateFromProps (props) {
    var viewBoxDimensions = this._viewBoxDimensions(props);

    var state = {
      scale: BAR_LENGTH / (props.max.value - props.min.value),
      viewBoxWidth: viewBoxDimensions[0],
      viewBoxHeight: viewBoxDimensions[1]
    };

    return state;
  }

  _translateBarWidth (value) {
    return Math.ceil(this.state.scale * value);
  }

  _sliceCommands (trackIndex, item, startValue) {
    var value = item.value - this.props.min.value;
    var start = this._translateBarWidth(startValue);
    var distance = Math.max(MID_BAR_THICKNESS, this._translateBarWidth(value));
    var commands;
    var spot = (trackIndex * BAR_THICKNESS) + MID_BAR_THICKNESS;
    if (this.props.vertical) {
      commands = "M" + spot + "," + (BAR_LENGTH - start) +
        " L" + spot + "," + (BAR_LENGTH - (start + distance));
    } else {
      commands = "M" + start + "," + spot +
        " L" + (start + distance) + "," + spot;
    }
    return commands;
  }
}

module.exports = Bar;
