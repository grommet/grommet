import React, { Component } from 'react';

import StyledMeter from './StyledMeter';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';

export default class Bar extends Component {
  static defaultProps = {
    background: 'light-1',
  };

  render() {
    const { background, round, size, theme, thickness, title, values } = this.props;
    const width = (size === 'full' ? 288 : parseMetricToInt(theme.global.size[size]));
    const height = parseMetricToInt(theme.global.edgeSize[thickness]);
    const mid = height / 2;
    const max = 100;
    const someHighlight = (values || []).some(v => v.highlight);

    let start = 0;
    const paths = (values || []).filter(v => v.value > 0).map((valueArg, index) => {
      const { color, highlight, label, onHover, value, ...rest } = valueArg;

      const key = `p-${index}`;
      const delta = (value * width) / max;
      const d = `M ${start},${mid} L ${start + delta},${mid}`;
      const colorName = color ||
        ((index === values.length - 1) ? 'accent-1' : `neutral-${index + 1}`);
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
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='none'
        width={size === 'full' ? '100%' : width}
        height={height}
      >
        <title>{title}</title>
        <path
          d={`M 0,${mid} L ${width},${mid}`}
          fill='none'
          stroke={colorForName(background, theme)}
          strokeWidth={height}
          strokeLinecap={round ? 'round' : 'square'}
        />
        {paths}
      </StyledMeter>
    );
  }
}
