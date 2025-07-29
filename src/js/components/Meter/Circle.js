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

const Circle = forwardRef((props, ref) => {
  const { background, max, round, size, thickness, type, values, ...rest } =
    props;
  const { theme, passThemeFlag } = useThemeValue();
  const width =
    size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  const strokeWidth =
    type === 'pie'
      ? width / 2
      : Math.min(
          width / 2 - 8,
          parseMetricToNum(theme.global.edgeSize[thickness] || thickness));
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

  const someHighlight = (values || []).some((v) => v.highlight);

  const gapTheme = theme.meter?.gap ?? '0';
  const gap = parseMetricToNum(theme.global.edgeSize[gapTheme] || gapTheme);

  const isSemi = type === 'semicircle';
  const isFull =
    values.reduce((total, currentValue) => total + currentValue.value, 0) >=
    max;
  let startValue = 0;
  let startAngle = isSemi ? 270 : 0;
  const paths = [];

  (values || [])
    .filter((v) => v.value > 0)
    .forEach((valueArg, index, { length }) => {
      const { color, highlight, label, onHover, value, ...pathRest } = valueArg;
      const key = `p-${index}`;
      const colorName =
        color || defaultColor(index, theme, values ? values.length : 0);

      let endAngle;
      if (startValue + value >= max) {
        endAngle = isSemi ? 90 : 360;
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

      const outerRadius = width / 2;
      const innerRadius = type === 'pie' ? 0 : width / 2 - strokeWidth;

      // We want a start gap if there's another segment before this one.
      // A circle's last segment can bump against the first segment if at max.
      const startGap =
        index === 0 && (isSemi || length === 1 || (length > 1 && !isFull))
          ? 0
          : gap / 2;

      // Similarly, we only need an end gap if there's a segment after this one.
      const endGap =
        index === length - 1 && (isSemi || length === 1) ? 0 : -gap / 2;
      const startRound = index === 0 && isSemi ? false : round;

      const d = wedgeCommands(
        centerX,
        centerY,
        outerRadius,
        innerRadius,
        startAngle,
        endAngle,
        startGap,
        endGap,
        startRound,
        round,
        index === 0 ? 1 : 0,
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
    </StyledMeter>
  );
});

Circle.displayName = 'Circle';

export { Circle };
