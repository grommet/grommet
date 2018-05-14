import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withFocus, withTheme } from '../hocs';

import StyledRangeInput from './StyledRangeInput';
import doc from './doc';

class RangeInput extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  }

  render() {
    const { grommet } = this.context;
    return (
      <StyledRangeInput grommet={grommet} {...this.props} type='range' />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(RangeInput);
}

const WrappedRangeInput = compose(
  withFocus,
  withTheme,
)(RangeInput);

export default React.forwardRef((props, ref) =>
  <WrappedRangeInput innerRef={ref} {...props} />);
