import React, { forwardRef, useContext, useState } from 'react';
import { Box } from '../Box';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';

const DIRECTIONS = {
  RIGHT: 'right',
  LEFT: 'left',
  ABOVE: 'above',
  BELOW: 'below',
};

const INPUT_DIRECTIONS = {
  [DIRECTIONS.RIGHT]: 'row',
  [DIRECTIONS.LEFT]: 'row-reverse',
  [DIRECTIONS.ABOVE]: 'column-reverse',
  [DIRECTIONS.BELOW]: 'column',
};

const allowedKeysToOpenInputValue = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
];
const allowedKeysToCloseInputValue = ['Tab', 'Escape'];

const RangeInput = forwardRef(
  (
    {
      a11yTitle,
      name,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      min = 0,
      max = 100,
      step = 1,
      inputDirection,
      inputValue = false,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);

    const inputDirectionSelected =
      INPUT_DIRECTIONS[inputDirection] || INPUT_DIRECTIONS.right;

    const isFillInput =
      inputDirection === DIRECTIONS.ABOVE || inputDirection === DIRECTIONS.BELOW
        ? 'horizontal'
        : false;

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
      <Box fill direction={inputDirectionSelected} align="center">
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
            if (allowedKeysToOpenInputValue.includes(event.key)) {
              setShowInputValue(true);
            } else if (allowedKeysToCloseInputValue.includes(event.key)) {
              setShowInputValue(false);
            }
            if (onKeyDown) onKeyDown(event);
          }}
          type="range"
        />
        {inputValue && showInputValue && (
          <Box align="start" fill={isFillInput}>
            <TextInput
              id="input-range-value"
              type="number"
              style={{ border: 'none', padding: '0 12px' }}
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
                if (allowedKeysToCloseInputValue.includes(event.key)) {
                  setShowInputValue(false);
                }
              }}
            />
          </Box>
        )}
      </Box>
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
