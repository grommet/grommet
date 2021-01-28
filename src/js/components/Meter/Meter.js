import React, { forwardRef, useMemo } from 'react';

import { Bar } from './Bar';
import { Circle } from './Circle';

const deriveMax = values => {
  let max = 100;
  if (values && values.length > 1) {
    max = 0;
    values.forEach(v => {
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
          {...rest}
        />
      );
    } else if (type === 'circle') {
      content = (
        <Circle
          ref={ref}
          max={memoizedMax}
          values={values}
          size={size}
          thickness={thickness}
          background={background}
          {...rest}
        />
      );
    }
    return content;
  },
);

Meter.displayName = 'Meter';

let MeterDoc;
if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}
const MeterWrapper = MeterDoc || Meter;

export { MeterWrapper as Meter };
