// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import classnames from 'classnames';
import { baseUnit, translateEndAngle, arcCommands } from '../../utils/Graphics';
import CSSClassnames from '../../utils/CSSClassnames';
import { baseDimension } from './utils';
import Graphic from './Graphic';

const CLASS_ROOT = CSSClassnames.METER;

const SPIRAL_WIDTH = baseDimension;
const SPIRAL_RADIUS = (baseDimension / 2) - (baseUnit / 2);
const RING_THICKNESS = baseUnit;
// Allow for active value content next to a spiral meter

export default class Spiral extends Graphic {

  constructor(props, context) {
    super(props, context);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Spiral';
  }

  _stateFromProps (props) {
    const viewBoxHeight = Math.max(SPIRAL_WIDTH,
      RING_THICKNESS * (props.series.length + 1) * 2);
    const viewBoxWidth = viewBoxHeight;

    const state = {
      startAngle: 0,
      anglePer: 270.0 / props.max,
      angleOffset: 180,
      // The last spiral ends out near but not quite at the edge of the
      // view box.
      startRadius: Math.max(SPIRAL_RADIUS,
        RING_THICKNESS * (props.series.length + 0.5)) -
          (Math.max(0, (props.series.length - 1)) * RING_THICKNESS),
      viewBoxHeight: viewBoxHeight,
      viewBoxRadius: viewBoxWidth / 2,
      viewBoxWidth: viewBoxWidth
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    const { viewBoxRadius } = this.state;
    const startAngle = translateEndAngle(this.state.startAngle,
      this.state.anglePer, startValue);
    const endAngle = translateEndAngle(startAngle, this.state.anglePer,
      item.value);
    const radius = Math.min(viewBoxRadius,
      this.state.startRadius + (trackIndex * RING_THICKNESS));
    return arcCommands(viewBoxRadius, viewBoxRadius, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }

  _renderThresholds () {
    return undefined;
  }

  _renderTopLayer () {
    const { activeIndex, onActivate } = this.props;
    const { viewBoxRadius } = this.state;
    const x = viewBoxRadius + (RING_THICKNESS * 0.5);
    let y = viewBoxRadius + (RING_THICKNESS * 1.75);
    const labels = this.props.series.map((item, index) => {
      const classes = classnames(
        `${CLASS_ROOT}__label`,
        {
          [`${CLASS_ROOT}__label--active`]: (index === activeIndex)
        }
      );

      const textX = x;
      const textY = y;

      y += RING_THICKNESS;

      let hoverEvents;
      if (onActivate) {
        hoverEvents = {
          onMouseOver: this.props.onActivate.bind(null, index),
          onMouseOut: this.props.onActivate.bind(null, null)
        };
      }

      return (
        <text key={item.label || index} x={textX} y={textY}
          textAnchor="start" fontSize={16}
          className={classes}
          onClick={item.onClick} {...hoverEvents}>
          {item.label}
        </text>
      );
    });

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

//needed in Graphic.js to fix minification issues
Spiral.displayName = 'Spiral';
