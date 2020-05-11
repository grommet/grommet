import React, { forwardRef, useContext, useMemo } from 'react';

import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { FormContext } from '../Form/FormContext';

export const CheckBoxGroup = forwardRef(
  (
    {
      checked: checkedProp,
      disabled: disabledProp,
      gap = 'small', // consistent with RadioButtonGroup default
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

    // In case option is a string, normalize it to be an object
    const options = useMemo(
      () =>
        optionsProp.map(option => {
          return typeof option === 'string'
            ? {
                disabled: disabledProp,
                id: option,
                label: option,
              }
            : option;
        }),
      [optionsProp, disabledProp],
    );

    // 'checked' is an array of checked valueKeys
    const [checked, setChecked] = formContext.useFormContext(
      name,
      checkedProp,
      [],
    );

    // Logic is necessary to maintain a proper data structure for Form logic
    const onCheckBoxChange = (event, optionChecked, option) => {
      // deep copy of checked
      const nextChecked = JSON.parse(JSON.stringify(checked)) || [];
      const optionIndex = nextChecked.indexOf(optionChecked);
      // If the index of the checked option isn't in the array add the option.
      // Otherwise, remove the option from the array to simulate a toggle action
      if (optionIndex < 0) nextChecked.push(optionChecked);
      else nextChecked.splice(optionIndex, 1);
      setChecked(nextChecked);

      // Same functionalities as Select onChange()
      if (onChange) {
        event.persist();
        const adjustedEvent = event;
        adjustedEvent.checked = nextChecked;
        adjustedEvent.option = option;
        onChange(adjustedEvent);
      }
    };

    return (
      <Box ref={ref} gap={gap} {...rest}>
        {options.map(option => {
          const label = labelKey ? option[labelKey] : option.label;
          const value = valueKey ? option[valueKey] : option.id;
          const checkedOption =
            option.checked || (checkedProp && checkedProp.indexOf(value) >= 0);
          return (
            <CheckBox
              checked={checkedOption}
              disabled={disabledProp || option.disabled}
              label={label}
              key={label}
              onChange={event => onCheckBoxChange(event, value, option)}
              {...option}
            />
          );
        })}
      </Box>
    );
  },
);

CheckBoxGroup.displayName = 'CheckBoxGroup';

let CheckBoxGroupDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CheckBoxGroupDoc = require('./doc').doc(CheckBoxGroup);
}
const RadioButtonGroupWrapper = CheckBoxGroupDoc || CheckBoxGroup;

export { RadioButtonGroupWrapper as RadioButtonGroup };
