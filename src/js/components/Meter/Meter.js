import React, { forwardRef, useMemo } from 'react';

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
      values: valuesProp,
      ...rest
    },
    ref,
  ) => {
    // normalize values to an array of objects
    const values = useMemo(() => {
      if (valuesProp) return valuesProp;
      if (value) return [{ color, value }];
      return [];
    }, [color, value, valuesProp]);

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
