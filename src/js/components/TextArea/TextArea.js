import React from 'react';
import { compose } from 'recompose';

import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';

import { StyledTextArea } from './StyledTextArea';

const TextArea = ({ fill, forwardRef, ...rest }) => {
  const onEsc = event => {
    // we have to stop both synthetic events and native events
    // drop and layer should not close by pressing esc on this input
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Keyboard onEsc={onEsc} onKeyDown={rest.onKeyDown}>
      <StyledTextArea ref={forwardRef} fillArg={fill} {...rest} />
    </Keyboard>
  );
};

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
