import React, { forwardRef, useContext, useEffect, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';

import { StyledTextArea } from './StyledTextArea';

const TextArea = forwardRef(
  (
    { fill, name, onBlur, onChange, onFocus, value: valueProp, ...rest },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = useState(
      valueProp !== undefined
        ? valueProp
        : (formContext && name && formContext.get(name)) || '',
    );
    // updating here causes the cursor bug
    useEffect(() => setValue(valueProp), [valueProp]);
    useEffect(() => {
      if (formContext && name) setValue(formContext.get(name) || '');
    }, [formContext, name]);

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
            if (formContext && name) {
              // should use setValue() here
              formContext.set(name, event.target.value);
            }
            if (onChange) {
              // should use setValue() here
              onChange(event);
            }
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
