import React, { forwardRef, useContext, useState } from 'react';
import { Box } from '../Box';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';

const allowedKeysToOpenInputMask = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
];
const allowedKeysToCloseInputMask = ['Tab', 'Escape'];

const RangeInput = forwardRef(
  (
    {
      a11yTitle,
      name,
      onChange,
      onFocus,
      onBlur,
      min = 0,
      max = 100,
      step = 1,
      inputValue,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const [value, setValue] = formContext.useFormInput(name, valueProp);

    const [focus, setFocus] = useState();

    const [showInputValue, setShowInputValue] = useState(false);

    const checkInputAndChange = event => {
      const newEvent = event;
      if (newEvent.target.value < min || !newEvent.target.value) {
        newEvent.target.value = min;
      } else if (newEvent.target.value > max) {
        newEvent.target.value = max;
      }
      setValue(newEvent.target.value);
      if (onChange) onChange(newEvent);
    };

    return (
      <>
        <StyledRangeInput
          aria-label={a11yTitle}
          ref={ref}
          name={name}
          focus={focus}
          value={value}
          min={min}
          max={max}
          step={step}
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
          onKeyDown={event => {
            const isNumber = !Number.isNaN(Number(event.key));
            if (isNumber) {
              const newEvent = event;
              newEvent.target.value = event.key;
              checkInputAndChange(newEvent);
              setShowInputValue(true);
            }
            if (allowedKeysToOpenInputMask.includes(event.key)) {
              setShowInputValue(true);
            } else if (allowedKeysToCloseInputMask.includes(event.key)) {
              setShowInputValue(false);
            }
          }}
          type="range"
        />
        {inputValue && showInputValue && (
          <Box align="center" width="100px">
            <TextInput
              id="input-mask"
              type="number"
              min={min}
              max={max}
              step={step}
              onFocus="true"
              value={value}
              onChange={event => {
                setValue(event.target.value);
                if (onChange) onChange(event);
              }}
              onBlur={checkInputAndChange}
              onKeyDown={event => {
                if (allowedKeysToCloseInputMask.includes(event.key)) {
                  setShowInputValue(false);
                }
              }}
            />
          </Box>
        )}
      </>
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
