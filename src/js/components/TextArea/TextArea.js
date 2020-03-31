import React, { forwardRef, useContext, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';

import { StyledTextArea } from './StyledTextArea';

const TextArea = forwardRef(
  (
    { fill, name, onBlur, onChange, onFocus, value: valueProp, ...rest },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormContext(name, valueProp, '');

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
          name={name}
          fillArg={fill}
          focus={focus}
          value={value}
          {...rest}
          onFocus={event => {
            setFocus(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={event => {
            setFocus(false);
            if (onBlur) onBlur(event);
          }}
          onChange={event => {
            setValue(event.target.value);
            if (onChange) onChange(event);
          }}
        />
      </Keyboard>
    );
  },
);

TextArea.displayName = 'TextArea';

let TextAreaDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextAreaDoc = require('./doc').doc(TextArea);
}
const TextAreaWrapper = TextAreaDoc || TextArea;

export { TextAreaWrapper as TextArea };
