import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef } from '../hocs';

import { StyledRangeInput } from './StyledRangeInput';

class RangeInput extends Component {
  render() {
    const { forwardRef, ...rest } = this.props;
    return <StyledRangeInput {...rest} ref={forwardRef} type="range" />;
  }
}
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
