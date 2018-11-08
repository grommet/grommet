import React, { Component } from 'react';
import { compose } from 'recompose';

import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef, withTheme } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

class TextArea extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { forwardRef } = nextProps;
    const { inputRef } = prevState;
    const nextInputRef = forwardRef || inputRef;
    if (nextInputRef !== inputRef) {
      return { inputRef: nextInputRef };
    }
    return null;
  }

  state = {
    inputRef: React.createRef(),
  };

  onEsc = event => {
    const { inputRef } = this.state;
    if (event.keyCode === 27 && document.activeElement === inputRef.current) {
      event.nativeEvent.stopImmediatePropagation(); // so Layer doesn't close
      inputRef.current.blur();
    }
  };

  render() {
    const { fill, forwardRef, ...rest } = this.props;
    const { inputRef } = this.state;
    return (
      <Keyboard onEsc={this.onEsc}>
        <StyledTextArea ref={inputRef} fillArg={fill} {...rest} />
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
