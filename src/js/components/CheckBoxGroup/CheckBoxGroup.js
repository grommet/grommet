import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { CheckBox } from '../CheckBox';
import { FormContext } from '../Form/FormContext';
import { StyledCheckBoxGroup } from './StyledCheckBoxGroup';
import { CheckBoxGroupPropTypes } from './propTypes';

const CheckBoxGroup = forwardRef(
  (
    {
      children,
      defaultValue,
      value: valueProp,
      disabled: disabledProp,
      focusIndicator = true,
      gap,
      labelKey,
      valueKey,
      onChange,
      options: optionsProp,
      name,
      ...rest
    },
    ref,
  ) => {
    const formContext = useContext(FormContext);
    const theme = useContext(ThemeContext) || defaultProps.theme;

    // In case option is a string, normalize it to be an object
    const options = optionsProp.map((option) =>
      typeof option === 'string'
        ? {
            disabled: disabledProp,
            value: option,
            label: option,
          }
        : option,
    );

    // 'value' is an array of checked valueKeys
    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
      initialValue: defaultValue || [],
    });

    // Logic is necessary to maintain a proper data structure for Form logic
    const onCheckBoxChange = (event, optionValue, option) => {
      // deep copy of value
      const nextValue = JSON.parse(JSON.stringify(value)) || [];
      const optionIndex = nextValue.indexOf(optionValue);
      // If the value option isn't in the array, add it.
      // Otherwise, remove it.
      if (optionIndex < 0) nextValue.push(optionValue);
      else nextValue.splice(optionIndex, 1);
      setValue(nextValue);
      // Similar functionality to Select onChange()
      if (onChange) {
        event.persist(); // extract from React synthetic event pool
        const adjustedEvent = event;
        adjustedEvent.value = nextValue;
        adjustedEvent.option = option;
        onChange(adjustedEvent);
      }
    };

    return (
      <StyledCheckBoxGroup
        ref={ref}
        role="group"
        {...theme.checkBoxGroup.container}
        gap={
          gap ||
          (theme.checkBoxGroup.container && theme.checkBoxGroup.container.gap
            ? theme.checkBoxGroup.container.gap
            : 'small') // consistent with RadioButtonGroup default
        }
        {...rest}
      >
        {options.map((option, index) => {
          const optionValue = option.value;
          const label = labelKey ? option[labelKey] : option.label;
          const valueOption = valueKey ? option[valueKey] : optionValue;
          const checked = value.indexOf(valueOption) >= 0;
          const disabled = disabledProp || option.disabled;
          const key = `${label}-${valueOption}`;

          if (option.checked)
            console.warn(
              // eslint-disable-next-line max-len
              `'checked' prop of an individual CheckBox shouldn't be used in a CheckBoxGroup component. Use the CheckBoxGroup 'value' prop instead.`,
            );
          // value shouldn't propagate the input field and the onChange option
          const { value: omit, ...optionRest } = option;
          const optionProps = { ...optionRest, label, disabled };
          return (
            <CheckBox
              key={key}
              {...optionProps}
              disabled={disabled}
              checked={checked}
              // when contained in a FormField, focusIndicator = false,
              // so that the FormField has focus style. However, we still
              // need to visually indicate when a CheckBox is active.
              // In CheckBox, if focus = true but focusIndicator = false,
              // we will apply the hover treament.
              focusIndicator={focusIndicator}
              label={label}
              onChange={(event) =>
                onCheckBoxChange(event, valueOption, optionProps)
              }
            >
              {children ? (state) => children(options[index], state) : null}
            </CheckBox>
          );
        })}
      </StyledCheckBoxGroup>
    );
  },
);

CheckBoxGroup.displayName = 'CheckBoxGroup';
CheckBoxGroup.propTypes = CheckBoxGroupPropTypes;

export { CheckBoxGroup };
