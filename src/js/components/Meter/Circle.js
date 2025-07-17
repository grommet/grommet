import React, { forwardRef } from 'react';

import {
  arcCommands,
  wedgeCommands,
  parseMetricToNum,
  translateEndAngle,
} from '../../utils';

import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor, fillProps } from './utils';
import { useThemeValue } from '../../utils/useThemeValue';
// import { lineCommands } from '../../utils/graphics';

const Circle = forwardRef((props, ref) => {
  const { background, max, round, size, thickness, type, values, ...rest } =
    props;
  const { theme, passThemeFlag } = useThemeValue();
  const width =
    size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  const strokeWidth =
    type === 'pie'
      ? width / 2
      : parseMetricToNum(theme.global.edgeSize[thickness] || thickness);
  const centerX = width / 2;
  const centerY = width / 2;
  const radius = width / 2 - strokeWidth / 2;
  // truncate to avoid floating point arithmetic errors
  // see: https://github.com/grommet/grommet/issues/6190
  // Choose a scale factor at least 3 orders of magnitude above max
  const scalePower = Math.max(5, Math.ceil(Math.log10(max)) + 3);
  const scale = 10 ** scalePower;

  const anglePer =
    Math.floor(((type === 'semicircle' ? 180 : 360) / max) * scale) / scale;
  //  (type === 'semicircle' ? 180 : 360) / max;
  const someHighlight = (values || []).some((v) => v.highlight);

  const gapTheme = theme.meter?.gap ?? '0';
  const gap = parseMetricToNum(theme.global.edgeSize[gapTheme] || gapTheme);

  let startValue = 0;
  let startAngle = type === 'semicircle' ? 270 : 0;
  const paths = [];
  let pathCaps = [];

  (values || [])
    .filter((v) => v.value > 0)
    .forEach((valueArg, index, { length }) => {
      const { color, highlight, label, onHover, value, ...pathRest } = valueArg;
      const key = `p-${index}`;
      const colorName =
        color || defaultColor(index, theme, values ? values.length : 0);

      let endAngle;
      if (startValue + value >= max) {
        endAngle = type === 'semicircle' ? 90 : 360;
      } else {
        endAngle = translateEndAngle(startAngle, anglePer, value);
      }
      let hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: () => onHover(true),
          onMouseLeave: () => onHover(false),
        };
      }
      const stroke = strokeProps(
        someHighlight && !highlight ? background : colorName,
        theme,
      );
      const fill = fillProps(
        someHighlight && !highlight ? background : colorName,
        theme,
      );

      if (round) {
        const d1 = arcCommands(centerX, centerY, radius, startAngle, endAngle);
        paths.unshift(
          <path
            key={key}
            d={d1}
            fill="none"
            {...stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            {...hoverProps}
            {...pathRest}
          />,
        );

        // To handle situations where the last values are small, redraw
        // a dot at the end. Give just a bit of angle to avoid anti-aliasing
        // leakage around the edge.
        const d2 = arcCommands(
          centerX,
          centerY,
          radius,
          endAngle - 0.5,
          endAngle,
        );
        const pathCap = (
          <path
            key={`${key}-`}
            d={d2}
            fill="none"
            {...stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            {...hoverProps}
            {...pathRest}
          />
        );
        // If we are on a large enough path to not need re-drawing previous
        // ones, clear the pathCaps we've collected already.
        if (endAngle - startAngle > 2 * anglePer) {
          pathCaps = [];
        }
        pathCaps.unshift(pathCap);
      } else {
        const outerRadius = width / 2;
        const innerRadius = type === 'pie' ? 0 : width / 2 - strokeWidth;

        const isSemi = type === 'semicircle';
        const leftGap = index === 0 && isSemi ? 0 : gap / 2;
        const rightGap = index === length - 1 && isSemi ? 0 : -gap / 2;
        const d = wedgeCommands(
          centerX,
          centerY,
          outerRadius,
          innerRadius,
          startAngle,
          endAngle,
          leftGap,
          rightGap,
        );
        paths.push(
          <path
            key={key}
            d={d}
            {...fill}
            {...stroke}
            strokeWidth={0}
            strokeLinecap="butt"
            {...hoverProps}
            {...pathRest}
          />,
        );
      }

      startValue += value;
      startAngle = endAngle;
    });

  let track;
  if (type === 'semicircle') {
    const d1 = arcCommands(centerX, centerY, radius, 270, 90);
    track = (
      <path
        d={d1}
        strokeWidth={strokeWidth}
        fill="none"
        {...strokeProps(background, theme)}
        strokeLinecap={round ? 'round' : 'square'}
      />
    );
  } else {
    track = (
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        {...strokeProps(background, theme)}
        strokeWidth={strokeWidth}
        strokeLinecap={round ? 'round' : 'square'}
        fill="none"
      />
    );
  }

  const viewBoxHeight = type === 'semicircle' ? width / 2 : width;

  return (
    <StyledMeter
      ref={ref}
      viewBox={`0 0 ${width} ${viewBoxHeight}`}
      width={size === 'full' ? '100%' : width}
      height={size === 'full' ? '100%' : viewBoxHeight}
      {...passThemeFlag}
      {...rest}
    >
      {track}
      {paths}
      {pathCaps}
    </StyledMeter>
  );
});

Circle.displayName = 'Circle';

export { Circle };
