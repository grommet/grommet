import React, { forwardRef, useContext, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';
import { RangeInputPropTypes } from './propTypes';

const RangeInput = forwardRef(
  (
    { a11yTitle, name, onChange, onFocus, onBlur, value: valueProp, ...rest },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
    });

    const [focus, setFocus] = useState();
    return (
      <StyledRangeInput
        aria-label={a11yTitle}
        ref={ref}
        name={name}
        focus={focus}
        value={value}
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
        type="range"
      />
    );
  },
);

RangeInput.displayName = 'RangeInput';
RangeInput.propTypes = RangeInputPropTypes;

export { RangeInput };
