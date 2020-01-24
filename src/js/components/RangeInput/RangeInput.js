import React, { forwardRef, useState } from 'react';

import { StyledRangeInput } from './StyledRangeInput';

const RangeInput = forwardRef(({ onFocus, onBlur, ...rest }, ref) => {
  const [focus, setFocus] = useState();
  return (
    <StyledRangeInput
      ref={ref}
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
      type="range"
    />
  );
});

RangeInput.displayName = 'RangeInput';

let RangeInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}
const RangeInputWrapper = RangeInputDoc || RangeInput;

export { RangeInputWrapper as RangeInput };
