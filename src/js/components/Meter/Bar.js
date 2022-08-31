import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';

import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';

const Bar = forwardRef((props, ref) => {
  const {
    background,
    max,
    round,
    size,
    thickness: thicknessProp,
    direction,
    values,
    ...rest
  } = props;
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const length =
    size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  const thickness = parseMetricToNum(
    theme.global.edgeSize[thicknessProp] || thicknessProp,
  );
  // account for the round cap, if any
  const capOffset = round ? thickness / 2 : 0;
  const mid = thickness / 2;

  const someHighlight = (values || []).some((v) => v.highlight);
  let start =
    direction === 'horizontal'
      ? capOffset
      : (max * (length - 2 * capOffset)) / max;

  const paths = (values || [])
    .reduce((acc, valueArg, index) => {
      if (valueArg.value > 0) {
        const { color, highlight, label, onHover, value, ...pathRest } =
          valueArg;
        const key = `p-${index}`;
        const delta = (value * (length - 2 * capOffset)) / max;
        const d =
          direction === 'horizontal'
            ? `M ${start},${mid} L ${start + delta},${mid}`
            : `M ${mid},${start} L ${mid},${start - delta}`;
        const colorName =
          color || defaultColor(index, theme, values ? values.length : 0);
        let hoverProps;
        if (onHover) {
          hoverProps = {
            onMouseOver: () => onHover(true),
            onMouseLeave: () => onHover(false),
          };
        }
        if (direction === 'horizontal') {
          start += delta;
        } else {
          start -= delta;
        }

        const result = (
          <path
            key={key}
            d={d}
            fill="none"
            {...strokeProps(
              someHighlight && !highlight ? background : colorName,
              theme,
            )}
            strokeWidth={direction === 'horizontal' ? thickness : length}
            strokeLinecap={round ? 'round' : 'butt'}
            {...hoverProps}
            {...pathRest}
          />
        );

        acc.push(result);
      }
      return acc;
    }, [])
    .reverse(); // reverse so the caps looks right

  let width;
  if (direction === 'horizontal') {
    width = size === 'full' ? '100%' : length;
  } else {
    width = size === 'full' ? '100%' : thickness;
  }

  const backgroundPath =
    direction === 'horizontal'
      ? `M ${capOffset},${mid} L ${length - capOffset},${mid}`
      : `M ${mid},${capOffset} L ${mid},${length - capOffset}`;

  return (
    <StyledMeter
      ref={ref}
      viewBox={
        direction === 'horizontal'
          ? `0 0 ${length} ${thickness}`
          : `0 0 ${thickness} ${length}`
      }
      preserveAspectRatio="none"
      width={width}
      height={direction === 'horizontal' ? thickness : length}
      round={round ? { size: thicknessProp } : undefined}
      {...rest}
    >
      <path
        d={backgroundPath}
        fill="none"
        {...strokeProps(background, theme)}
        strokeWidth={thickness}
        strokeLinecap={round ? 'round' : 'square'}
      />
      {paths}
    </StyledMeter>
  );
});

Bar.displayName = 'Bar';

Bar.defaultProps = {
  background: 'light-1',
};

Object.setPrototypeOf(Bar.defaultProps, defaultProps);

export { Bar };
