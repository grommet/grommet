import React from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef } from '../hocs';

import { StyledRangeInput } from './StyledRangeInput';

const RangeInput = ({ forwardRef, ...rest }) => (
  <StyledRangeInput {...rest} ref={forwardRef} type="range" />
);

let RangeInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}
const RangeInputWrapper = compose(
  withFocus(),
  withForwardRef,
)(RangeInputDoc || RangeInput);

export { RangeInputWrapper as RangeInput };
