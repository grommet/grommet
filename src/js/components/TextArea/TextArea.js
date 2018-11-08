import React, { Component } from 'react';
import { compose } from 'recompose';

import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

class TextArea extends Component {
  onEsc = event => {
    event.nativeEvent.stopImmediatePropagation(); // so Layer doesn't close
  };

  render() {
    const { fill, forwardRef, ...rest } = this.props;
    return (
      <Keyboard onEsc={this.onEsc}>
        <StyledTextArea ref={forwardRef} fillArg={fill} {...rest} />
      </Keyboard>
    );
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
