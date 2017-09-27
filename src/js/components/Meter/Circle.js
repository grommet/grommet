import React, { Component } from 'react';

import StyledMeter from './StyledMeter';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';
import { translateEndAngle, arcCommands } from '../utils/graphics';

export default class Circle extends Component {
  render() {
    const { background, round, size, theme, thickness, values } = this.props;
    const width = (size === 'full' ? 288 : parseMetricToInt(theme.global.size[size]));
    const height = parseMetricToInt(theme.global.edgeSize[thickness]);
    const mid = width / 2;
    const radius = (width / 2) - (height / 2);
    const max = 100;
    const anglePer = (360 / max);
    const someHighlight = (values || []).some(v => v.highlight);

    let startValue = 0;
    let startAngle = 0;
    const paths = (values || []).filter(v => v.value > 0).map((valueArg, index) => {
      const { color, highlight, label, onHover, value, ...rest } = valueArg;
      const key = `p-${index}`;
      const colorName = color ||
        ((index === values.length - 1) ? 'accent-1' : `neutral-${index + 1}`);

      let endAngle;
      if (startValue + value >= max) {
        endAngle = 360;
      } else {
        endAngle = Math.min(360,
          translateEndAngle(startAngle, anglePer, value));
      }
      const d = arcCommands(width / 2, width / 2, radius, startAngle, endAngle);
      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }
      startValue += value;
      startAngle = endAngle;

      return (
        <path
          key={key}
          d={d}
          fill='none'
          stroke={colorForName((someHighlight && !highlight) ? background : colorName, theme)}
          strokeWidth={height}
          strokeLinecap={round ? 'round' : 'square'}
          {...hoverProps}
          {...rest}
        />
      );
    }).reverse(); // reverse so the caps looks right

    return (
      <StyledMeter
        viewBox={`0 0 ${width} ${width}`}
        width={size === 'full' ? '100%' : width}
        height={size === 'full' ? '100%' : width}
      >
        <circle
          cx={mid}
          cy={mid}
          r={radius}
          stroke={colorForName(background, theme)}
          strokeWidth={height}
          strokeLinecap={round ? 'round' : 'square'}
          fill='none'
        />
        {paths}
      </StyledMeter>
    );
  }
}
