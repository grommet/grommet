// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {baseUnit, baseDimension, translateEndAngle, arcCommands} from './utils';
import Graphic from './Graphic';

const CIRCLE_WIDTH = baseDimension;
const CIRCLE_RADIUS = (baseDimension / 2) - (baseUnit / 2);
const RING_THICKNESS = baseUnit;

class Circle extends Graphic {

  _stateFromProps (props) {
    if (! props.stacked &&
      (props.series.length - 1) * RING_THICKNESS > CIRCLE_RADIUS) {
      console.warn("You cannot have more than " +
        Math.round(CIRCLE_RADIUS / RING_THICKNESS) +
        " data values in a circle Meter");
    }

    var state = {
      startAngle: 1,
      anglePer: (! props.max) ? 0 : 358.0 / (props.max.value - props.min.value),
      angleOffset: 180,
      viewBoxWidth: CIRCLE_WIDTH,
      viewBoxHeight: CIRCLE_WIDTH
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    var startAngle = translateEndAngle(this.state.startAngle, this.state.anglePer, startValue);
    var endAngle = Math.max(startAngle + (RING_THICKNESS / 2),
      translateEndAngle(startAngle, this.state.anglePer, item.value));
    var radius = Math.max(1, CIRCLE_RADIUS - (trackIndex * RING_THICKNESS));
    return arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }
}

module.exports = Circle;
