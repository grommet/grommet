import React, { Component } from 'react';
import { compose } from 'recompose';

import { withForwardRef, withTheme } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

class TextArea extends Component {
  render() {
    const { forwardRef, ...rest } = this.props;
    return <StyledTextArea ref={forwardRef} {...rest} />;
  }
}

let TextAreaDoc;
if (process.env.NODE_ENV !== 'production') {
  TextAreaDoc = require('./doc').doc(TextArea); // eslint-disable-line global-require
}
const TextAreaWrapper = compose(
  withTheme,
  withForwardRef
)(TextAreaDoc || TextArea);

export { TextAreaWrapper as TextArea };
