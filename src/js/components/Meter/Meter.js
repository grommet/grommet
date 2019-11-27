import React, { useMemo } from 'react';

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

const Meter = ({
  background = { color: 'light-2', opacity: 'medium' },
  size = 'medium',
  thickness = 'medium',
  type = 'bar',
  values,
  ...rest
}) => {
  const memoizedMax = useMemo(() => deriveMax(values), [values]);
  let content;
  if (type === 'bar') {
    content = (
      <Bar
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
};

let MeterDoc;
if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}
const MeterWrapper = MeterDoc || Meter;

export { MeterWrapper as Meter };
