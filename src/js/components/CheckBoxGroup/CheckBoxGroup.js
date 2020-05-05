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
      '',
    );

    // Logic is necessary to maintain a proper data structure for Form logic
    const onCheckBoxChange = (event, optionChecked) => {
      const nextChecked = checked || [];
      const optionIndex = nextChecked.indexOf(optionChecked);

      if (optionIndex < 0) nextChecked.push(optionChecked);
      else nextChecked.splice(optionIndex, 1);

      setChecked(nextChecked);
      if (onChange) onChange(event);
    };

    return (
      <Box ref={ref} gap={gap} {...rest}>
        {options.map(
          ({
            label: labelOption,
            disabled,
            checked: checkedOption,
            ...optionRest
          }) => {
            const label = optionRest[labelKey] || labelOption;
            const value = valueKey ? optionRest[valueKey] : optionRest.id;
            return (
              <CheckBox
                checked={
                  checkedOption ||
                  (checkedProp && checkedProp.indexOf(value) >= 0)
                }
                disabled={disabledProp || disabled}
                id={optionRest.id}
                label={label}
                key={label}
                onChange={event => onCheckBoxChange(event, value)}
                {...optionRest}
              />
            );
          },
        )}
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
