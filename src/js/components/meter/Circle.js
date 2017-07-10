// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import { baseDimension } from './utils';
import Graphic from './Graphic';
import { baseUnit, translateEndAngle, arcCommands } from '../../utils/Graphics';

const CIRCLE_WIDTH = baseDimension;
const CIRCLE_RADIUS = (baseDimension / 2) - (baseUnit / 2);
const RING_THICKNESS = baseUnit;

export default class Circle extends Graphic {

  constructor(props, context) {
    super(props, context);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Circle';
  }

  _stateFromProps (props) {
    if (! props.stacked &&
      (props.series.length - 1) * RING_THICKNESS > CIRCLE_RADIUS) {
      console.warn("You cannot have more than " +
        Math.round(CIRCLE_RADIUS / RING_THICKNESS) +
        " data values in a circle Meter");
    }

    const state = {
      startAngle: 0,
      anglePer: (! props.max) ? 0 : 360 / (props.max - props.min),
      angleOffset: 180,
      viewBoxWidth: CIRCLE_WIDTH,
      viewBoxHeight: CIRCLE_WIDTH
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue, max) {
    const startAngle = translateEndAngle(
      this.state.startAngle, this.state.anglePer, startValue
    );

    var endAngle;
    if (! item.value) {
      endAngle = startAngle;
    } else if (startValue + item.value >= max) {
      endAngle = 360;
    } else {
      endAngle = Math.min(360,
        Math.max(startAngle,
          translateEndAngle(startAngle, this.state.anglePer, item.value)
        ));
    }

    const radius = Math.max(1, CIRCLE_RADIUS - (trackIndex * RING_THICKNESS));
    return arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }
}

//needed in Graphic.js to fix minification issues
Circle.displayName = 'Circle';
