import React, { forwardRef, useContext, useRef, useState } from 'react';
import {
  StyledNumberInput,
  StyledNumberInputContainer,
  StyledPlaceholder,
} from './StyledNumberInput';

import { FormContext } from '../Form/FormContext';

const renderLabel = suggestion => {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
};

const NumberInput = forwardRef(
  (
    {
      id,
      defaultValue,
      value: valueProp,
      min,
      max,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      placeholder,
      plain,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);
    const inputRef = useRef();

    const [value, setValue] = formContext.useFormContext(name, valueProp);

    const [focus, setFocus] = useState();

    const showStyledPlaceholder =
      placeholder && typeof placeholder !== 'string' && !value;

    return (
      <StyledNumberInputContainer>
        {showStyledPlaceholder && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
        <StyledNumberInput
          type="number"
          min={min || ''}
          max={max || ''}
          ref={ref || inputRef}
          id={id}
          name={name}
          autoComplete="off"
          plain={plain}
          placeholder={
            typeof placeholder === 'string' ? placeholder : undefined
          }
          focus={focus}
          {...rest}
          defaultValue={renderLabel(defaultValue)}
          value={renderLabel(value) || ''}
          onFocus={event => {
            setFocus(true);
            if (onFocus) {
              onFocus(event);
            }
          }}
          onChange={event => {
            setValue(event.target.value);
            if (onChange) onChange(event);
          }}
        />
      </StyledNumberInputContainer>
    );
  },
);

NumberInput.displayName = 'NumberInput';

let NumberInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  NumberInputDoc = require('./doc').doc(NumberInput);
}
const NumberInputWrapper = NumberInputDoc || NumberInput;

export { NumberInputWrapper as NumberInput };
