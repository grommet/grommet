import React, { forwardRef, useContext, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';

const RangeInput = forwardRef(
  ({ name, onChange, onFocus, onBlur, value: valueProp, ...rest }, ref) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormContext(name, valueProp, 0);

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
          setValue(event.target.value);
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
