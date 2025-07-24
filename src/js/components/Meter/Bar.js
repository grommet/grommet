import React, { forwardRef } from 'react';

import { parseMetricToNum } from '../../utils';

import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor, fillProps } from './utils';
import { useThemeValue } from '../../utils/useThemeValue';

const Bar = forwardRef((props, ref) => {
  const {
    background = 'light-1',
    max,
    round,
    size,
    thickness: thicknessProp,
    direction,
    values,
    reverse,
    ...rest
  } = props;
  const { theme, passThemeFlag } = useThemeValue();
  const length =
    size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  const thickness = parseMetricToNum(
    theme.global.edgeSize[thicknessProp] || thicknessProp,
  );

  const gapTheme = theme.meter?.gap ?? 0;
  const gap = parseMetricToNum(theme.global.edgeSize[gapTheme] || gapTheme);

  // account for the round cap, if any
  const capRadius = round ? thickness / 2 : 0;
  const mid = thickness / 2;

  const someHighlight = (values || []).some((v) => v.highlight);
  let start =
    direction === 'horizontal'
      ? capRadius
      : (max * (length - 2 * capRadius)) / max;

  // Available space for the bar is the length of the meter minus an end cap
  // on each end, minus the gap between bars.
  const lengthAvailable = length - 2 * capRadius - gap * (values.length - 1);

  const paths = (values || [])
    .reduce((acc, valueArg, index) => {
      if (valueArg.value > 0) {
        const { color, highlight, label, onHover, value, ...pathRest } =
          valueArg;
        const key = `p-${index}`;
        const delta = (value * lengthAvailable) / max;

        // add a little bit extra to start to allow for larger rounded inset cap
        // The extra needed can be calculated by the Pythagorean theorem
        const extraGap =
          round && index !== 0
            ? Math.sqrt((thickness / 2 + gap / 4) ** 2 - (thickness / 2) ** 2)
            : 0;
        const initialStart =
          direction === 'horizontal' ? start + extraGap : start - extraGap;

        // define the x,y points for the corners of the bar.
        const points =
          direction === 'horizontal'
            ? [
                `${initialStart},${thickness}`,
                `${initialStart},0`,
                `${start + delta},0`,
                `${start + delta},${thickness}`,
              ]
            : [
                `${thickness},${initialStart}`,
                `0,${initialStart}`,
                `0,${start - delta}`,
                `${thickness},${start - delta}`,
              ];

        // if rounded, the starting cap is an arc. All but the first bar
        // will have a gap and a slightly larger radius
        const startRadius = index === 0 ? capRadius : capRadius + gap / 2;
        const startCap = round
          ? `A ${startRadius},${startRadius} 0 0 ${index === 0 ? 1 : 0} ${
              points[1]
            }`
          : `L ${points[1]}`;
        const endCap = round
          ? `A ${capRadius},${capRadius} 0 0 1 ${points[3]}`
          : `L ${points[3]}`;
        const d = `M ${points[0]} ${startCap} L ${points[2]} ${endCap} Z`;
        const colorName =
          color || defaultColor(index, theme, values ? values.length : 0);
        let hoverProps;
        if (onHover) {
          hoverProps = {
            onMouseOver: () => onHover(true),
            onMouseLeave: () => onHover(false),
          };
        }
        const fill = fillProps(
          someHighlight && !highlight ? background : colorName,
          theme,
        );

        acc.push(
          <path
            key={key}
            d={d}
            {...fill}
            strokeWidth={0}
            stroke="none"
            {...hoverProps}
            {...pathRest}
          />,
        );

        if (direction === 'horizontal') {
          start += delta + gap;
        } else {
          start -= delta + gap;
        }
      }
      return acc;
    }, [])
    .reverse(); // reverse so the caps look right

  let width;
  if (direction === 'horizontal') {
    width = size === 'full' ? '100%' : length;
  } else {
    width = size === 'full' ? '100%' : thickness;
  }

  const backgroundPath =
    direction === 'horizontal'
      ? `M ${capRadius},${mid} L ${length - capRadius},${mid}`
      : `M ${mid},${capRadius} L ${mid},${length - capRadius}`;

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
      {...passThemeFlag}
      {...rest}
      reverse={reverse}
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

export { Bar };
