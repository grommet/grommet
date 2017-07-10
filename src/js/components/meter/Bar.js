// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import { baseUnit } from '../../utils/Graphics';
import { baseDimension } from './utils';
import Graphic from './Graphic';

const BAR_LENGTH = baseDimension;
const BAR_THICKNESS = baseUnit;
const MID_BAR_THICKNESS = BAR_THICKNESS / 2;
// const MINIMUM_THICKNESS = BAR_THICKNESS / 6;

export default class Bar extends Graphic {

  constructor(props, context) {
    super(props, context);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Bar';
  }

  _viewBoxDimensions (props) {
    let viewBoxHeight;
    let viewBoxWidth;
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
    const viewBoxDimensions = this._viewBoxDimensions(props);

    const state = {
      scale: BAR_LENGTH / (props.max - props.min),
      viewBoxWidth: viewBoxDimensions[0],
      viewBoxHeight: viewBoxDimensions[1]
    };

    return state;
  }

  _translateBarWidth (value) {
    return Math.ceil(this.state.scale * value);
  }

  _sliceCommands (trackIndex, item, startValue) {
    const value = item.value - this.props.min;
    const start = this._translateBarWidth(startValue);
    const distance = this._translateBarWidth(value);
    // const distance = Math.max((item.value > 0 ? MINIMUM_THICKNESS : 0),
    //   this._translateBarWidth(value));
    let commands;
    let spot = (trackIndex * BAR_THICKNESS) + MID_BAR_THICKNESS;
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

//needed in Graphic.js to fix minification issues
Bar.displayName = 'Bar';
