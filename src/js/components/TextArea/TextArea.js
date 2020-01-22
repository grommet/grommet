import React, { forwardRef, useState } from 'react';

import { Keyboard } from '../Keyboard';

import { StyledTextArea } from './StyledTextArea';

const TextArea = forwardRef(({ fill, onBlur, onFocus, ...rest }, ref) => {
  const [focus, setFocus] = useState();
  return (
    <Keyboard
      onEsc={event => {
        // we have to stop both synthetic events and native events
        // drop and layer should not close by pressing esc on this input
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <StyledTextArea
        ref={ref}
        fillArg={fill}
        focus={focus}
        {...rest}
        onFocus={event => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={event => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
      />
    </Keyboard>
  );
});

TextArea.displayName = 'TextArea';

let TextAreaDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextAreaDoc = require('./doc').doc(TextArea);
}
const TextAreaWrapper = TextAreaDoc || TextArea;

export { TextAreaWrapper as TextArea };
