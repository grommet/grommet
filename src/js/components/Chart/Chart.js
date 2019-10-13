import React, { useRef, useState, useEffect } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor, parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';

import { StyledChart } from './StyledChart';
import {
  normalizeValues,
  normalizeBounds,
  areNormalizedValuesEquals,
  areNormalizedBoundsEquals,
} from './utils';

const renderBars = (values, bounds, scale, height) =>
  (values || []).map((valueArg, index) => {
    const { label, onHover, value, ...rest } = valueArg;

    const key = `p-${index}`;
    const bottom = value.length === 2 ? bounds[1][0] : value[1];
    const top = value.length === 2 ? value[1] : value[2];
    if (top !== 0) {
      const d =
        `M ${(value[0] - bounds[0][0]) * scale[0]},` +
        `${height - (bottom - bounds[1][0]) * scale[1]}` +
        ` L ${(value[0] - bounds[0][0]) * scale[0]},` +
        `${height - (top - bounds[1][0]) * scale[1]}`;

      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }

      return (
        <g key={key} fill="none">
          <title>{label}</title>
          <path d={d} {...hoverProps} {...rest} />
        </g>
      );
    }
    return undefined;
  });

const renderLine = (values, bounds, scale, height, { onClick, onHover }) => {
  let d = '';
  (values || []).forEach(({ value }, index) => {
    d +=
      `${index ? ' L' : 'M'} ${(value[0] - bounds[0][0]) * scale[0]},` +
      `${height - (value[1] - bounds[1][0]) * scale[1]}`;
  });

  let hoverProps;
  if (onHover) {
    hoverProps = {
      onMouseOver: () => onHover(true),
      onMouseLeave: () => onHover(false),
    };
  }
  let clickProps;
  if (onClick) {
    clickProps = { onClick };
  }

  return (
    <g fill="none">
      <path d={d} {...hoverProps} {...clickProps} />
    </g>
  );
};

const renderArea = (
  values,
  bounds,
  scale,
  height,
  { color, onClick, onHover, theme },
) => {
  let d = '';
  (values || []).forEach(({ value }, index) => {
    const top = value.length === 2 ? value[1] : value[2];
    d +=
      `${!index ? 'M' : ' L'} ${(value[0] - bounds[0][0]) * scale[0]},` +
      `${height - (top - bounds[1][0]) * scale[1]}`;
  });
  (values || []).reverse().forEach(({ value }) => {
    const bottom = value.length === 2 ? bounds[1][0] : value[1];
    d +=
      ` L ${(value[0] - bounds[0][0]) * scale[0]},` +
      `${height - (bottom - bounds[1][0]) * scale[1]}`;
  });
  if (d.length > 0) {
    d += ' Z';
  }

  let hoverProps;
  if (onHover) {
    hoverProps = {
      onMouseOver: () => onHover(true),
      onMouseLeave: () => onHover(false),
    };
  }
  let clickProps;
  if (onClick) {
    clickProps = { onClick };
  }

  return (
    <g fill={normalizeColor(color.color || color, theme)}>
      <path d={d} {...hoverProps} {...clickProps} />
    </g>
  );
};

const Chart = props => {
  const {
    color,
    onClick,
    onHover,
    overflow,
    round,
    size,
    theme,
    thickness,
    type,
    values,
    bounds,
    ...rest
  } = props;

  const containerRef = useRef(null);

  const [state, setState] = useState({
    containerWidth: 0,
    containerHeight: 0,
  });
  const {
    containerWidth,
    containerHeight,
    values: valuesState,
    bounds: boundsState,
  } = state;

  const nextValues = normalizeValues(values);
  const nextBounds = normalizeBounds(bounds, nextValues);

  if (
    !valuesState ||
    (!areNormalizedValuesEquals(values, valuesState) &&
      !areNormalizedValuesEquals(valuesState, nextValues)) ||
    (!areNormalizedBoundsEquals(bounds, boundsState) &&
      !areNormalizedBoundsEquals(boundsState, nextBounds))
  ) {
    setState({ ...state, bounds: nextBounds, values: nextValues });
  }

  const onResize = () => {
    const containerNode = containerRef.current;
    if (containerNode) {
      const { parentNode } = containerNode;
      if (parentNode) {
        const rect = parentNode.getBoundingClientRect();
        setState({
          ...state,
          containerWidth: rect.width,
          containerHeight: rect.height,
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return function cleanup() {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (!boundsState || !valuesState) return null;

  delete rest.values;

  const sizeWidth = typeof size === 'string' ? size : size.width || 'medium';
  const sizeHeight = typeof size === 'string' ? size : size.height || 'medium';
  const width =
    sizeWidth === 'full'
      ? containerWidth
      : parseMetricToNum(theme.global.size[sizeWidth] || sizeWidth);
  const height =
    sizeHeight === 'full'
      ? containerHeight
      : parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
  const strokeWidth = parseMetricToNum(theme.global.edgeSize[thickness]);
  const scale = [
    width / (boundsState[0][1] - boundsState[0][0]),
    height / (boundsState[1][1] - boundsState[1][0]),
  ];
  const viewBox = overflow
    ? `0 0 ${width} ${height}`
    : `-${strokeWidth / 2} -${strokeWidth / 2} ${width + strokeWidth} ${height +
        strokeWidth}`;
  const colorName = typeof color === 'object' ? color.color : color;
  const opacity = color.opacity
    ? theme.global.opacity[color.opacity]
    : undefined;

  let contents;
  if (type === 'bar') {
    contents = renderBars(valuesState, boundsState, scale, height);
  } else if (type === 'line') {
    contents = renderLine(valuesState, boundsState, scale, height, props);
  } else if (type === 'area') {
    contents = renderArea(valuesState, boundsState, scale, height, props);
  }

  return (
    <StyledChart
      ref={containerRef}
      viewBox={viewBox}
      preserveAspectRatio="none"
      width={size === 'full' ? '100%' : width}
      height={size === 'full' ? '100%' : height}
      {...rest}
    >
      <g
        stroke={normalizeColor(colorName, theme)}
        strokeWidth={strokeWidth}
        strokeLinecap={round ? 'round' : 'butt'}
        strokeLinejoin={round ? 'round' : 'miter'}
        opacity={opacity}
      >
        {contents}
      </g>
    </StyledChart>
  );
};

Chart.defaultProps = {
  color: 'accent-1',
  overflow: false,
  size: { width: 'medium', height: 'small' },
  thickness: 'medium',
  type: 'bar',
};

Object.setPrototypeOf(Chart.defaultProps, defaultProps);

let ChartDoc;
if (process.env.NODE_ENV !== 'production') {
  ChartDoc = require('./doc').doc(Chart); // eslint-disable-line global-require
}
const ChartWrapper = compose(withTheme)(ChartDoc || Chart);

export { ChartWrapper as Chart };
