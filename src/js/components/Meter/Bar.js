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
    thickness,
    direction,
    values,
    ...rest
  } = props;
  const theme = useContext(ThemeContext) || defaultProps.theme;
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

  // suppose if the user only passes the
  // two values, 50, 20 and max value provided
  // by user is 100 then the bar starts value from top.
  // It means in the top its shows
  // the value for 20 then 50. Here I am creating a dumpy
  // value for the leftover of max
  // value which will show empty value in the top.
  if (direction === 'vertical') {
    const res = values.reduce((acc, curr) => acc + curr.value, 0);
    if (res !== max) {
      values.push({ value: max - res, color: '#F2F2F2' });
      values.reverse();
    }
  }
  const paths = (values || []).reduce((acc, valueArg, index) => {
    if (valueArg.value > 0) {
      const { color, highlight, label, onHover, value, ...pathRest } = valueArg;
      const key = `p-${index}`;
      let delta;
      let d;
      if (direction === 'horizontal') {
        delta = (value * (width - 2 * capOffset)) / max;
        d = `M ${start},${mid} L ${start + delta},${mid}`;
      } else if (direction === 'vertical') {
        //  if there is only one value provided by
        //  user like value = 30, previous logic
        //  display the value in the top of bar but by
        //  providing the height in the M of the d
        //  ,the value starts from bottom but instead of 30,
        //  the stroke shows value for 70,
        //  so here (max - value) keeps the logic right
        //  for the value given by user.
        if (values.length === 1) {
          delta = ((max - value) * (width - 2 * capOffset)) / max;
          d = `M ${mid},${width} L ${mid},${start + delta}`;
        } else {
          delta = (value * (width - 2 * capOffset)) / max;
          d = `M ${mid},${start} L ${mid},${start + delta}`;
        }
      }

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
      const result = (
        <path
          key={key}
          d={d}
          fill="none"
          {...strokeProps(
            someHighlight && !highlight ? background : colorName,
            theme,
          )}
          strokeWidth={direction === 'horizontal' ? height : width}
          strokeLinecap={round ? 'round' : 'butt'}
          {...hoverProps}
          {...pathRest}
        />
      );

      acc.push(result);
    }
    return acc;
  }, []);

  let dForFirstPath;
  let viewBox;
  let widthStyledMeter;
  let heightStyledMeter;
  if (direction === 'horizontal') {
    dForFirstPath = `M ${capOffset},${mid} L ${width - capOffset},${mid}`;
    viewBox = `0 0 ${width} ${height}`;
    widthStyledMeter = size === 'full' ? '100%' : width;
    heightStyledMeter = height;
  } else {
    dForFirstPath = `M ${mid},${capOffset} L ${mid},${width - capOffset}`;
    viewBox = `0 0 ${height} ${width}`;
    widthStyledMeter = size === 'full' ? '100%' : height;
    heightStyledMeter = width;
  }

  return (
    <StyledMeter
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio="none"
      width={widthStyledMeter}
      height={heightStyledMeter}
      round={round ? { size: thickness } : undefined}
      {...rest}
    >
      <path
        d={dForFirstPath}
        fill="none"
        {...strokeProps(background, theme)}
        strokeWidth={height}
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
