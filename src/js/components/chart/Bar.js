import React, { Component } from 'react';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';

export default class Bar extends Component {
  render() {
    const {
      bounds: initialBounds, color, cap, size, theme, thickness, title, values,
    } = this.props;

    let bounds = initialBounds;
    if (!bounds) {
      // derive from values, TODO: move outside of render()
      bounds = [[], []];
      (values || []).forEach((value) => {
        bounds[0][0] = Math.min(bounds[0][0], value[0]);
        bounds[0][1] = Math.max(bounds[0][1], value[0]);
        bounds[1][0] = Math.min(bounds[1][0], value[1]);
        bounds[1][1] = Math.max(bounds[1][1], value[1]);
      });
    }

    const sizeWidth = (typeof size === 'string') ? size : size.width;
    const sizeHeight = (typeof size === 'string') ? size : size.height;
    const width = (sizeWidth === 'full' ? (bounds[0][1] - bounds[0][0]) :
      parseMetricToInt(theme.global.size[sizeWidth]));
    const height = (sizeHeight === 'full' ? (bounds[1][1] - bounds[1][0]) :
      parseMetricToInt(theme.global.size[sizeHeight]));
    const strokeWidth = parseMetricToInt(theme.global.edgeSize[thickness]);
    const scaleX = width / (bounds[0][1] - bounds[0][0]);
    const scaleY = height / (bounds[1][1] - bounds[1][0]);

    const paths = (values || []).map((valueArg, index) => {
      const { label, value, ...rest } = valueArg;

      const key = `p-${index}`;
      const d = `M ${value[0] * scaleX},${height - (bounds[1][0] * scaleY)}
        L ${value[0] * scaleX},${height - (value[1] * scaleY)}`;

      return (
        <g
          key={key}
          fill='none'
          stroke={colorForName(color, theme)}
          strokeWidth={strokeWidth}
          strokeLinecap={cap}
        >
          <title>{label}</title>
          <path d={d} {...rest} />
        </g>
      );
    });

    return (
      <svg
        viewBox={`-${strokeWidth / 2} -${strokeWidth / 2} ${width + strokeWidth} ${height + strokeWidth}`}
        preserveAspectRatio='none'
        width={size === 'full' ? '100%' : width}
        height={height}
      >
        <title>{title}</title>
        {paths}
      </svg>
    );
  }
}
