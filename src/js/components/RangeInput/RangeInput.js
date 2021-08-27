import React, { forwardRef, useContext, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';

const RangeInput = forwardRef(
  (
    { a11yTitle, name, onChange, onFocus, onBlur, value: valueProp, ...rest },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const [num, setNum] = formContext.useFormInput({
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
        value={num}
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
          setNum(event.target.value);
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
