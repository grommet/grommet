import React, { Component } from 'react';
import { compose } from 'recompose';

import { withForwardRef, withTheme } from '../hocs';

import StyledTextArea from './StyledTextArea';
import doc from './doc';

class TextArea extends Component {
  render() {
    const { forwardRef, ...rest } = this.props;
    return (
      <StyledTextArea innerRef={forwardRef} {...rest} />
    );
  }
}

export default compose(
  withTheme,
  withForwardRef
)(
  process.env.NODE_ENV !== 'production' ? doc(TextArea) : TextArea
);
