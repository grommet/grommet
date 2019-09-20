import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { arcCommands, parseMetricToNum, translateEndAngle } from '../../utils';

import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';

const Circle = props => {
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
  const mid = width / 2;
  const radius = width / 2 - height / 2;
  const anglePer = 360 / max;
  const someHighlight = (values || []).some(v => v.highlight);

  let startValue = 0;
  let startAngle = 0;
  const paths = [];
  let pathCaps = [];
  (values || [])
    .filter(v => v.value > 0)
    .forEach((valueArg, index) => {
      const { color, highlight, label, onHover, value, ...pathRest } = valueArg;
      const key = `p-${index}`;
      const colorName =
        color ||
        (index === values.length - 1
          ? theme.meter.color
          : defaultColor(index, theme));

      let endAngle;
      if (startValue + value >= max) {
        endAngle = 360;
      } else {
        endAngle = Math.min(
          360,
          translateEndAngle(startAngle, anglePer, value),
        );
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

      if (round) {
        const d1 = arcCommands(
          width / 2,
          width / 2,
          radius,
          startAngle,
          endAngle,
        );
        paths.unshift(
          <path
            key={key}
            d={d1}
            fill="none"
            {...stroke}
            strokeWidth={height}
            strokeLinecap="round"
            {...hoverProps}
            {...pathRest}
          />,
        );

        // To handle situations where the last values are small, redraw
        // a dot at the end. Give just a bit of angle to avoid anti-aliasing
        // leakage around the edge.
        const d2 = arcCommands(
          width / 2,
          width / 2,
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
            strokeWidth={height}
            strokeLinecap="round"
            {...hoverProps}
            {...pathRest}
          />
        );
        // If we are on a large enough path to not need re-drawing previous ones,
        // clear the pathCaps we've collected already.
        if (endAngle - startAngle > 2 * anglePer) {
          pathCaps = [];
        }
        pathCaps.unshift(pathCap);
      } else {
        const d = arcCommands(
          width / 2,
          width / 2,
          radius,
          startAngle,
          endAngle,
        );
        paths.push(
          <path
            key={key}
            d={d}
            fill="none"
            {...stroke}
            strokeWidth={height}
            strokeLinecap="butt"
            {...hoverProps}
            {...pathRest}
          />,
        );
      }
      startValue += value;
      startAngle = endAngle;
    });

  return (
    <StyledMeter
      viewBox={`0 0 ${width} ${width}`}
      width={size === 'full' ? '100%' : width}
      height={size === 'full' ? '100%' : width}
      {...rest}
    >
      <circle
        cx={mid}
        cy={mid}
        r={radius}
        {...strokeProps(background, theme)}
        strokeWidth={height}
        strokeLinecap={round ? 'round' : 'square'}
        fill="none"
      />
      {paths}
      {pathCaps}
    </StyledMeter>
  );
};

Circle.defaultProps = {};
Object.setPrototypeOf(Circle.defaultProps, defaultProps);

const CircleWrapper = compose(withTheme)(Circle);

export { CircleWrapper as Circle };
