import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledRangeInput } from './StyledRangeInput';

class RangeInput extends Component {
  render() {
    const { forwardRef, ...rest } = this.props;
    return <StyledRangeInput {...rest} ref={forwardRef} type="range" />;
  }
}
let RangeInputDoc;
if (process.env.NODE_ENV !== 'production') {
  RangeInputDoc = require('./doc').doc(RangeInput); // eslint-disable-line global-require
}
const RangeInputWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(RangeInputDoc || RangeInput);

export { RangeInputWrapper as RangeInput };
