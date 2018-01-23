import React, { Component } from 'react';
import { compose } from 'recompose';

import { colorForName, parseMetricToInt } from '../../utils';

import { withTheme } from '../hocs';

import StyledChart from './StyledChart';

import doc from './doc';

const renderBars = (values, bounds, scale, height) =>
  (values || []).map((valueArg, index) => {
    const { label, value, ...rest } = valueArg;

    const key = `p-${index}`;
    const bottom = (value.length === 2 ? bounds[1][0] : value[1]);
    const top = (value.length === 2 ? value[1] : value[2]);
    if (top !== 0) {
      const d = `M ${(value[0] - bounds[0][0]) * scale[0]},` +
      `${height - ((bottom - bounds[1][0]) * scale[1])}` +
      ` L ${(value[0] - bounds[0][0]) * scale[0]},` +
      `${height - ((top - bounds[1][0]) * scale[1])}`;

      return (
        <g key={key} fill='none'>
          <title>{label}</title>
          <path d={d} {...rest} />
        </g>
      );
    }
    return undefined;
  });

const renderLine = (values, bounds, scale, height) => {
  let d = '';
  (values || []).forEach(({ value }, index) => {
    d += `${index ? ' L' : 'M'} ${(value[0] - bounds[0][0]) * scale[0]},` +
    `${height - ((value[1] - bounds[1][0]) * scale[1])}`;
  });
  return (
    <g fill='none'>
      <path d={d} />
    </g>
  );
};

const renderArea = (values, bounds, scale, height, props) => {
  const { color, theme } = props;
  let d = '';
  (values || []).forEach(({ value }, index) => {
    const top = (value.length === 2 ? value[1] : value[2]);
    d += `${!index ? 'M' : ' L'} ${(value[0] - bounds[0][0]) * scale[0]},` +
    `${height - ((top - bounds[1][0]) * scale[1])}`;
  });
  (values || []).reverse().forEach(({ value }) => {
    const bottom = (value.length === 2 ? bounds[1][0] : value[1]);
    d += ` L ${value[0] * scale[0]},` +
    `${height - ((bottom - bounds[1][0]) * scale[1])}`;
  });
  d += ' Z';
  return (
    <g fill={colorForName(color, theme)}>
      <path d={d} />
    </g>
  );
};

const normalizeBounds = (props) => {
  let bounds = props.bounds;
  if (!bounds) {
    bounds = [[0, 1], [0, 1]];
    (props.values || []).forEach((value) => {
      bounds[0][0] = Math.min(bounds[0][0], value.value[0]);
      bounds[0][1] = Math.max(bounds[0][1], value.value[0]);
      bounds[1][0] = Math.min(bounds[1][0], value.value[1]);
      bounds[1][1] = Math.max(bounds[1][1], value.value[1]);
    });
  }
  return bounds;
};

class Chart extends Component {
  static defaultProps = {
    color: 'accent-1',
    size: { width: 'medium', height: 'small' },
    thickness: 'medium',
    type: 'bar',
  };

  constructor(props, context) {
    super(props, context);
    this.state = { bounds: normalizeBounds(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bounds: normalizeBounds(nextProps) });
  }

  render() {
    const {
      color, round, size, theme, thickness, type, values, ...rest
    } = this.props;
    const { bounds } = this.state;

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
      <StyledChart
        viewBox={`-${strokeWidth / 2} -${strokeWidth / 2}
          ${width + strokeWidth} ${height + strokeWidth}`}
        preserveAspectRatio='none'
        width={size === 'full' ? '100%' : width}
        height={height}
        {...rest}
      >
        <g
          stroke={colorForName(color, theme)}
          strokeWidth={strokeWidth}
          strokeLinecap={round ? 'round' : 'butt'}
          strokeLinejoin={round ? 'round' : 'miter'}
        >
          {contents}
        </g>
      </StyledChart>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Chart);
}

export default compose(
  withTheme,
)(Chart);
