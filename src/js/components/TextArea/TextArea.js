import React, { forwardRef, useContext, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';

import { StyledTextArea } from './StyledTextArea';
import { TextAreaPropTypes } from './propTypes';

const TextArea = forwardRef(
  (
    {
      a11yTitle,
      fill,
      focusIndicator = true,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);
    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
    });
    const [focus, setFocus] = useState();

    return (
      <Keyboard
        onEsc={(event) => {
          // we have to stop both synthetic events and native events
          // drop and layer should not close by pressing esc on this input
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }}
        onKeyDown={onKeyDown}
      >
        <StyledTextArea
          aria-label={a11yTitle}
          ref={ref}
          name={name}
          fillArg={fill}
          focus={focus}
          value={value}
          focusIndicator={focusIndicator}
          {...rest}
          onFocus={(event) => {
            setFocus(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={(event) => {
            setFocus(false);
            if (onBlur) onBlur(event);
          }}
          onChange={(event) => {
            setValue(event.target.value);
            if (onChange) onChange(event);
          }}
        />
      </Keyboard>
    );
  },
);

TextArea.displayName = 'TextArea';
TextArea.propTypes = TextAreaPropTypes;

export { TextArea };
