// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import {baseUnit, baseDimension} from './utils';
import Graphic from './Graphic';

const BAR_LENGTH = baseDimension;
const BAR_THICKNESS = baseUnit;
const MID_BAR_THICKNESS = BAR_THICKNESS / 2;

export default class Bar extends Graphic {

  constructor (props) {
    super(props);
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
        if (props.legend && 'inline' === props.legend.placement) {
          viewBoxHeight *= 2;
        }
      }
    }
    return [viewBoxWidth, viewBoxHeight];
  }

  _stateFromProps (props) {
    const viewBoxDimensions = this._viewBoxDimensions(props);

    const state = {
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
    const value = item.value - this.props.min.value;
    const start = this._translateBarWidth(startValue);
    const distance = Math.max((item.value > 0 ? MID_BAR_THICKNESS : 0),
      this._translateBarWidth(value));
    let commands;
    if (this.props.legend && 'inline' === this.props.legend.placement) {
      trackIndex *= 2;
    }
    let spot = (trackIndex * BAR_THICKNESS) + MID_BAR_THICKNESS;
    if (this.props.legend && 'inline' === this.props.legend.placement) {
      spot += MID_BAR_THICKNESS;
    }
    if (this.props.vertical) {
      commands = "M" + spot + "," + (BAR_LENGTH - start) +
        " L" + spot + "," + (BAR_LENGTH - (start + distance));
    } else {
      commands = "M" + start + "," + spot +
        " L" + (start + distance) + "," + spot;
    }
    return commands;
  }

  _renderInlineLegend () {
    let result;
    if (this.props.legend && 'inline' === this.props.legend.placement) {
      result = this.props.series.map(function (item, index) {
        const spot = (index * BAR_THICKNESS * 2) + MID_BAR_THICKNESS;

        var label;
        if (item.hasOwnProperty('label')) {
          label = (
            <text key="label" x="0" y={spot} role="presentation"
              textAnchor="start" fontSize={16}>
              {item.label}
            </text>
          );
        }

        var value;
        if (item.hasOwnProperty('value')) {
          let text = item.value;
          if (item.units || this.props.units) {
            text += ' ' + (item.units || this.props.units);
          }
          let x = this._translateBarWidth(this.props.max.value);
          value = (
            <text key="value" x={x} y={spot} role="presentation"
              textAnchor="end" fontSize={16}>
              {text}
            </text>
          );
        }

        return [label, value];
      }, this);
    }
    return result;
  }
}

//needed in Graphic.js to fix minification issues
Bar.displayName = 'Bar';
