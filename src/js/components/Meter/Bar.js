import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';

import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';

const Bar = props => {
  const {
    background,
    max,
    round,
    size,
    theme,
    thickness,
    values,
    ...rest
  } = props;
  const width =
    size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  const height = parseMetricToNum(
    theme.global.edgeSize[thickness] || thickness,
  );
  // account for the round cap, if any
  const capOffset = round ? height / 2 : 0;
  const mid = height / 2;
  const someHighlight = (values || []).some(v => v.highlight);

  let start = capOffset;
  const paths = (values || [])
    .filter(v => v.value > 0)
    .map((valueArg, index) => {
      const { color, highlight, label, onHover, value, ...pathRest } = valueArg;

      const key = `p-${index}`;
      const delta = (value * (width - 2 * capOffset)) / max;
      const d = `M ${start},${mid} L ${start + delta},${mid}`;
      const colorName =
        color || defaultColor(index, theme, values ? values.length : 0);
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
          fill="none"
          {...strokeProps(
            someHighlight && !highlight ? background : colorName,
            theme,
          )}
          strokeWidth={height}
          strokeLinecap={round ? 'round' : 'butt'}
          {...hoverProps}
          {...pathRest}
        />
      );
    })
    .reverse(); // reverse so the caps looks right

  return (
    <StyledMeter
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width={size === 'full' ? '100%' : width}
      height={height}
      round={round ? { size: thickness } : undefined}
      {...rest}
    >
      <path
        d={`M ${capOffset},${mid} L ${width - capOffset},${mid}`}
        fill="none"
        {...strokeProps(background, theme)}
        strokeWidth={height}
        strokeLinecap={round ? 'round' : 'square'}
      />
      {paths}
    </StyledMeter>
  );
};

Bar.defaultProps = {
  background: 'light-1',
};

Object.setPrototypeOf(Bar.defaultProps, defaultProps);

const BarWrapper = compose(withTheme)(Bar);

export { BarWrapper as Bar };
