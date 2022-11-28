import React, { forwardRef, useMemo, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Bar } from './Bar';
import { Circle } from './Circle';
import { MeterPropTypes } from './propTypes';

const deriveMax = (values) => {
  let max = 100;
  if (values && values.length > 1) {
    max = 0;
    values.forEach((v) => {
      max += v.value;
    });
  }
  return max;
};

const Meter = forwardRef(
  (
    {
      background = { color: 'light-2', opacity: 'medium' },
      color,
      direction = 'horizontal',
      size = 'medium',
      thickness = 'medium',
      type = 'bar',
      value,
      reverse,
      values: valuesProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    // normalize values to an array of objects
    const values = useMemo(() => {
      if (valuesProp) return valuesProp;
      if (value) return [{ color, value }];
      return [];
    }, [color, value, valuesProp]);

    const reverseDirection =
      direction === 'horizontal' &&
      (theme.dir === 'rtl' || reverse) &&
      !(theme.dir === 'rtl' && reverse);

    const memoizedMax = useMemo(() => deriveMax(values), [values]);
    let content;
    if (type === 'bar') {
      content = (
        <Bar
          ref={ref}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          background={background}
          direction={direction}
          reverse={reverseDirection}
          {...rest}
        />
      );
    } else if (type === 'circle' || type === 'pie' || type === 'semicircle') {
      content = (
        <Circle
          ref={ref}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          type={type}
          background={background}
          reverse={reverseDirection}
          {...rest}
        />
      );
    }
    return content;
  },
);

Meter.displayName = 'Meter';
Meter.prototype = MeterPropTypes;

export { Meter };
