import React, { Component } from 'react';
import { compose } from 'recompose';

import { parseMetricToInt } from '../utils/mixins';
import { colorForName } from '../utils/colors';

import { withTheme } from '../hocs';

import doc from './doc';

const renderBars = (values, bounds, scale, height) =>
  (values || []).map((valueArg, index) => {
    const { label, value, ...rest } = valueArg;

    const key = `p-${index}`;
    const d = `M ${value[0] * scale[0]},${height - (bounds[1][0] * scale[1])}
      L ${value[0] * scale[0]},${height - (value[1] * scale[1])}`;

    return (
      <g key={key} fill='none'>
        <title>{label}</title>
        <path d={d} {...rest} />
      </g>
    );
  });

const renderLine = (values, bounds, scale, height) => {
  let d = '';
  (values || []).forEach(({ value }, index) => {
    d += `${index ? ' L' : 'M'}
      ${value[0] * scale[0]},${height - (value[1] * scale[1])}`;
  });
  return (
    <g fill='none'>
      <path d={d} />
    </g>
  );
};

const renderArea = (values, bounds, scale, height, props) => {
  const { color, theme } = props;
  let d = `M 0,${height}`;
  (values || []).forEach(({ value }, index) => {
    if (!index) {
      d += `M ${value[0] * scale[0]},${height}`;
    }
    d += ` L ${value[0] * scale[0]},${height - (value[1] * scale[1])}`;
  });
  d += `L ${values[values.length - 1].value[0] * scale[0]},${height} Z`;
  return (
    <g fill={colorForName(color, theme)}>
      <path d={d} />
    </g>
  );
};

class Chart extends Component {
  static defaultProps = {
    color: 'accent-1',
    size: { width: 'medium', height: 'small' },
    thickness: 'medium',
    type: 'bar',
  };

  render() {
    const {
      bounds: initialBounds, color, round, size, theme, thickness, title, type,
      values, ...rest
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
    const scale = [
      (width / (bounds[0][1] - bounds[0][0])),
      (height / (bounds[1][1] - bounds[1][0])),
    ];

    let contents;
    if (type === 'bar') {
      contents = renderBars(values, bounds, scale, height);
    } else if (type === 'line') {
      contents = renderLine(values, bounds, scale, height);
    } else if (type === 'area') {
      contents = renderArea(values, bounds, scale, height, this.props);
    }

    return (
      <svg
        viewBox={`-${strokeWidth / 2} -${strokeWidth / 2}
          ${width + strokeWidth} ${height + strokeWidth}`}
        preserveAspectRatio='none'
        width={size === 'full' ? '100%' : width}
        height={height}
        {...rest}
      >
        <title>{title}</title>
        <g
          stroke={colorForName(color, theme)}
          strokeWidth={strokeWidth}
          strokeLinecap={round ? 'round' : 'square'}
          strokeLinejoin={round ? 'round' : 'miter'}
        >
          {contents}
        </g>
      </svg>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Chart);
}

export default compose(
  withTheme,
)(Chart);
