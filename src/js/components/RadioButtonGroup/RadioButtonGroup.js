import React, { forwardRef, useContext, useRef, useState } from 'react';

import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { Box } from '../Box';
import { RadioButton } from '../RadioButton';
import { RadioButtonGroupPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const RadioButtonGroup = forwardRef(
  (
    {
      children,
      defaultValue,
      disabled,
      focusIndicator = true,
      name,
      onChange,
      options: optionsProp,
      value: valueProp,
      gap,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);
    const { theme } = useThemeValue();
    const options = optionsProp.map((o) =>
      typeof o !== 'object'
        ? {
            disabled,
            id: rest.id ? `${rest.id}-${o}` : `${o}`,
            label: typeof o !== 'string' ? JSON.stringify(o) : o,
            value: o,
          }
        : { disabled, ...o },
    );

    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
      initialValue: defaultValue ?? '',
    });

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

    const onNext = () => {
      if (valueIndex !== undefined && valueIndex < options.length - 1) {
        const nextIndex = valueIndex + 1;
        optionRefs.current[nextIndex].focus();
      }
    };

    const onPrevious = () => {
      if (valueIndex > 0) {
        const previousIndex = valueIndex - 1;
        optionRefs.current[previousIndex].focus();
      }
    };

    const onFocus = (index) => {
      setFocus(index);
    };

    const onRadioButtonChange = (event, optionValue) => {
      setValue(optionValue);
      if (onChange) {
        event.persist();
        const adjustedEvent = event;
        adjustedEvent.value = optionValue;
        onChange(adjustedEvent);
      }
    };

    const onBlur = () => setFocus(undefined);

    return (
      <Keyboard
        target="document"
        onUp={focus !== undefined ? onPrevious : undefined}
        onDown={focus !== undefined ? onNext : undefined}
        onLeft={focus !== undefined ? onPrevious : undefined}
        onRight={focus !== undefined ? onNext : undefined}
      >
        <Box
          ref={ref}
          role="radiogroup"
          {...theme.radioButtonGroup.container}
          gap={
            gap ||
            (theme.radioButtonGroup.container &&
            theme.radioButtonGroup.container.gap
              ? theme.radioButtonGroup.container.gap
              : 'small')
          }
          {...rest}
        >
          {options.map(
            (
              {
                disabled: optionDisabled,
                id,
                label,
                value: optionValue,
                ...optionRest
              },
              index,
            ) => {
              const isFocusable = focus === index || valueIndex === index;

              return (
                <RadioButton
                  ref={(aRef) => {
                    optionRefs.current[index] = aRef;
                  }}
                  key={optionValue}
                  name={name}
                  label={!children ? label : undefined}
                  disabled={optionDisabled}
                  checked={optionValue === value}
                  focus={isFocusable}
                  focusIndicator={focusIndicator}
                  id={id}
                  value={optionValue}
                  onFocus={() => onFocus(index)}
                  onBlur={onBlur}
                  onChange={(event) => onRadioButtonChange(event, optionValue)}
                  tabIndex={disabled ? -1 : 0}
                  {...optionRest}
                >
                  {children
                    ? (state) => children(optionsProp[index], state)
                    : null}
                </RadioButton>
              );
            },
          )}
        </Box>
      </Keyboard>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
RadioButtonGroup.propTypes = RadioButtonGroupPropTypes;

export { RadioButtonGroup };
