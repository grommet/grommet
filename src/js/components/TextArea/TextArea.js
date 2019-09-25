import React, { Component } from 'react';
import { compose } from 'recompose';

import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

class TextArea extends Component {
  onEsc = event => {
    // we have to stop both synthetic events and native events
    // drop and layer should not close by pressing esc on this input
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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
  // eslint-disable-next-line global-require
  TextAreaDoc = require('./doc').doc(TextArea);
}
const TextAreaWrapper = compose(
  withFocus({ focusWithMouse: true }),
  withForwardRef,
)(TextAreaDoc || TextArea);

export { TextAreaWrapper as TextArea };
