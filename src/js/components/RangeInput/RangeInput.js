import React, { forwardRef, useContext, useEffect, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';

const RangeInput = forwardRef(
  ({ name, onChange, onFocus, onBlur, value: valueProp, ...rest }, ref) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = useState(
      valueProp !== undefined
        ? valueProp
        : (formContext && name && formContext.get(name)) || '',
    );
    useEffect(() => setValue(valueProp), [valueProp]);
    useEffect(() => {
      if (formContext && name) setValue(formContext.get(name) || '');
    }, [formContext, name]);

    const [focus, setFocus] = useState();
    return (
      <StyledRangeInput
        ref={ref}
        name={name}
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
            formContext.set(name, event.target.value);
          }
          if (onChange) onChange(event);
        }}
        type="range"
      />
    );
  },
);

RangeInput.displayName = 'RangeInput';

let RangeInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}
const RangeInputWrapper = RangeInputDoc || RangeInput;

export { RangeInputWrapper as RangeInput };
