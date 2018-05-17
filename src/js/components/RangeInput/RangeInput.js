import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import StyledRangeInput from './StyledRangeInput';
import doc from './doc';

class RangeInput extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  }

  render() {
    const { grommet } = this.context;
    const { forwardRef, ...rest } = this.props;
    return (
      <StyledRangeInput
        grommet={grommet}
        {...rest}
        innerRef={forwardRef}
        type='range'
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(RangeInput);
}

export default compose(
  withFocus,
  withTheme,
  withForwardRef,
)(RangeInput);
