import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import StyledRangeInput from './StyledRangeInput';
import doc from './doc';

class RangeInput extends Component {
  render() {
    const { forwardRef, ...rest } = this.props;
    return (
      <StyledRangeInput
        {...rest}
        innerRef={forwardRef}
        type='range'
      />
    );
  }
}

let RangeInputWrapper = RangeInput;
if (process.env.NODE_ENV !== 'production') {
  RangeInputWrapper = doc(RangeInputWrapper);
}

export default compose(
  withFocus,
  withTheme,
  withForwardRef,
)(RangeInputWrapper);
