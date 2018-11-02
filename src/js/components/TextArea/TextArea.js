import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

class TextArea extends Component {
  render() {
    const { fill, forwardRef, ...rest } = this.props;
    return <StyledTextArea ref={forwardRef} fillArg={fill} {...rest} />;
  }
}

let TextAreaDoc;
if (process.env.NODE_ENV !== 'production') {
  TextAreaDoc = require('./doc').doc(TextArea); // eslint-disable-line global-require
}
const TextAreaWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(TextAreaDoc || TextArea);

export { TextAreaWrapper as TextArea };
