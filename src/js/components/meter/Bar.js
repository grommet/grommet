import React, { Component } from 'react';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';

export default class Bar extends Component {
  static defaultProps = {
    background: 'light-1',
  };

  render() {
    const { background, cap, size, theme, thickness, values } = this.props;
    const width = (size === 'full' ? 288 : parseMetricToInt(theme.global.size[size]));
    const height = parseMetricToInt(theme.global.edgeSize[thickness]);
    const mid = height / 2;
    const max = 100;
    const someHighlight = (values || []).some(v => v.highlight);

    let start = 0;
    const paths = (values || []).map((valueArg, index) => {
      const { color, highlight, label, onHover, value, ...rest } = valueArg;

      const key = `p-${index}`;
      const delta = (value * width) / max;
      const d = `M ${start},${mid} L ${start + delta},${mid}`;
      const colorName = color || `neutral-${index + 1}`;
      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }
      start += delta;

      return (
        <path
          key={key}
          d={d}
          fill='none'
          stroke={colorForName(colorName, theme)}
          strokeWidth={height}
          strokeLinecap={cap}
          strokeOpacity={(someHighlight && !highlight) ? 0.5 : 1}
          {...hoverProps}
          {...rest}
        />
      );
    }).reverse(); // reverse so the caps looks right

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='none'
        width={size === 'full' ? '100%' : width}
        height={height}
      >
        <path
          d={`M 0,${mid} L ${width},${mid}`}
          fill='none'
          stroke={colorForName(background, theme)}
          strokeWidth={height}
          strokeLinecap={cap}
        />
        {paths}
      </svg>
    );
  }
}
