import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { RadioButton } from '../RadioButton';

const RadioButtonGroup = forwardRef(
  (
    {
      children,
      gap = 'small',
      name,
      onChange,
      options: optionsProp,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    // normalize options to always use an object
    const options = useMemo(
      () =>
        optionsProp.map(o =>
          typeof o === 'string'
            ? { id: rest.id ? `${rest.id}-${o}` : o, label: o, value: o }
            : o,
        ),
      [optionsProp, rest.id],
    );
    const [value, setValue] = useState(valueProp);
    useEffect(() => setValue(valueProp), [valueProp]);
    const [focus, setFocus] = useState();

    const optionRefs = useRef([]);

    const valueIndex = React.useMemo(() => {
      let result;
      options.some((option, index) => {
        if (option.value === value) {
          result = index;
          return true;
        }
        return false;
      });
      return result;
    }, [options, value]);

    useEffect(() => {
      if (focus && valueIndex >= 0) optionRefs.current[valueIndex].focus();
    }, [focus, valueIndex]);

    const onNext = () => {
      if (valueIndex !== undefined && valueIndex < options.length - 1) {
        const nextIndex = valueIndex + 1;
        const nextValue = options[nextIndex].value;
        setValue(nextValue);
        if (onChange) {
          onChange({ target: { value: nextValue } });
        }
      }
    };

    const onPrevious = () => {
      if (valueIndex > 0) {
        const nextIndex = valueIndex - 1;
        const nextValue = options[nextIndex].value;
        setValue(nextValue);
        if (onChange) {
          onChange({ target: { value: nextValue } });
        }
      }
    };

    const onFocus = () => {
      // Delay just a wee bit so Chrome doesn't missing turning the button on.
      // Chrome behaves differently in that focus is given to radio buttons
      // when the user selects one, unlike Safari and Firefox.
      setTimeout(() => !focus && setFocus(true), 1);
    };

    const onBlur = () => focus && setFocus(false);

    return (
      <Keyboard
        target="document"
        onUp={focus ? onPrevious : undefined}
        onDown={focus ? onNext : undefined}
        onLeft={focus ? onPrevious : undefined}
        onRight={focus ? onNext : undefined}
      >
        <Box ref={ref} gap={gap} {...rest}>
          {options.map(({ disabled, id, label, value: optionValue }, index) => (
            <RadioButton
              ref={aRef => {
                optionRefs.current[index] = aRef;
              }}
              key={optionValue}
              name={name}
              label={!children ? label : undefined}
              disabled={disabled}
              checked={optionValue === value}
              focus={
                focus &&
                (optionValue === value || (value === undefined && !index))
              }
              id={id}
              value={optionValue}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              {children ? state => children(optionsProp[index], state) : null}
            </RadioButton>
          ))}
        </Box>
      </Keyboard>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';

let RadioButtonGroupDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RadioButtonGroupDoc = require('./doc').doc(RadioButtonGroup);
}
const RadioButtonGroupWrapper = RadioButtonGroupDoc || RadioButtonGroup;

export { RadioButtonGroupWrapper as RadioButtonGroup };
