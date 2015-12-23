// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import { baseUnit, baseDimension, classRoot, translateEndAngle, arcCommands } from './utils';
import Graphic from './Graphic';

const CLASS_ROOT = classRoot;

var SPIRAL_WIDTH = baseDimension;
var SPIRAL_RADIUS = (baseDimension / 2) - (baseUnit / 2);
var RING_THICKNESS = baseUnit;
// Allow for active value content next to a spiral meter
var SPIRAL_TEXT_PADDING = (baseUnit * 2);

export default class Spiral extends Graphic {

  _stateFromProps (props) {
    var viewBoxHeight = Math.max(SPIRAL_WIDTH,
      RING_THICKNESS * (props.series.length + 1) * 2);
    var viewBoxWidth = viewBoxHeight + (2 * SPIRAL_TEXT_PADDING);

    var state = {
      startAngle: 0,
      anglePer: 270.0 / props.max.value,
      angleOffset: 180,
      // The last spiral ends out near but not quite at the edge of the view box.
      startRadius: Math.max(SPIRAL_RADIUS,
        RING_THICKNESS * (props.series.length + 0.5)) -
          (Math.max(0, (props.series.length - 1)) * RING_THICKNESS),
      viewBoxWidth: viewBoxWidth,
      viewBoxHeight: viewBoxHeight
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    var startAngle = translateEndAngle(this.state.startAngle, this.state.anglePer, startValue);
    var endAngle = translateEndAngle(startAngle, this.state.anglePer, item.value);
    var radius = Math.min(SPIRAL_RADIUS, this.state.startRadius + (trackIndex * RING_THICKNESS));
    return arcCommands(SPIRAL_WIDTH / 2, SPIRAL_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }

  _renderThresholds () {
    return null;
  }

  _renderTopLayer () {
    var x = SPIRAL_RADIUS + RING_THICKNESS;
    var y = SPIRAL_RADIUS + (RING_THICKNESS * 2.2);
    var labels = this.props.series.map(function (item, index) {
      var classes = [CLASS_ROOT + "__label"];
      if (index === this.props.activeIndex) {
        classes.push(CLASS_ROOT + "__label--active");
      }

      var textX = x;
      var textY = y;

      y += RING_THICKNESS;

      return (
        <text key={item.label || index} x={textX} y={textY}
          textAnchor="start" fontSize={16}
          className={classes.join(' ')}
          onMouseOver={this.props.onActivate.bind(null, index)}
          onMouseOut={this.props.onActivate.bind(null, null)}
          onClick={item.onClick} >
          {item.label}
        </text>
      );
    }, this);

    return (
      <g className={CLASS_ROOT + "__labels"}>
        {labels}
      </g>
    );
  }
}

Spiral.defaultProps = {
  thresholds: []
};
