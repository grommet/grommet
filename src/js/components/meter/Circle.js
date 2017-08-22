import React, { Component } from 'react';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';
import { translateEndAngle, arcCommands } from '../utils/graphics';

export default class Circle extends Component {
  static defaultProps = {
    background: 'light-1',
    cap: 'square',
  };

  render() {
    const { background, cap, size, theme, thickness, values } = this.props;
    const width = (size === 'full' ? 288 : parseMetricToInt(theme.global.size[size]));
    const height = parseMetricToInt(theme.global.edgeSize[thickness]);
    const mid = width / 2;
    const radius = (width / 2) - (height / 2);
    const max = 100;
    const anglePer = (360 / max);

    let startValue = 0;
    let startAngle = 0;
    const paths = (values || []).map((valueArg, index) => {
      const { value, label, color, ...rest } = valueArg;
      const key = `p-${index}`;
      const colorName = color || `neutral-${index + 1}`;

      let endAngle;
      if (startValue + value >= max) {
        endAngle = 360;
      } else {
        endAngle = Math.min(360,
          translateEndAngle(startAngle, anglePer, value));
      }

      const d = arcCommands(width / 2, width / 2, radius, startAngle, endAngle);
      startValue += value;
      startAngle = endAngle;

      return (
        <path
          key={key}
          d={d}
          fill='none'
          stroke={colorForName(colorName, theme)}
          strokeWidth={height}
          strokeLinecap={cap}
          {...rest}
        />
      );
    }).reverse(); // reverse so the caps looks right

    return (
      <svg
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
          strokeLinecap={cap}
          fill='none'
        />
        {paths}
      </svg>
    );
  }
}
