import React, { useMemo }  from 'react';

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

const Meter = (props) =>  {
  const { type, ...rest } = props;
  const memoizedMax = useMemo(() => deriveMax(props.values), [props.values]);
  let content;
  if (type === 'bar') {
    content = <Bar max={memoizedMax} {...rest} />;
  } else if (type === 'circle') {
    content = <Circle max={memoizedMax} {...rest} />;
  }
  return content;
};

Meter.defaultProps = {
  background: { color: 'light-2', opacity: 'medium' },
  size: 'medium',
  thickness: 'medium',
  type: 'bar',
}

let MeterDoc;
if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}
const MeterWrapper = MeterDoc || Meter;

export { MeterWrapper as Meter };
