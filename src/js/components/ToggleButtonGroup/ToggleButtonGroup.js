import React, { useMemo } from 'react';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import { Box } from '../Box';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { CheckBoxGroup } from '../CheckBoxGroup';

const ToggleButtonGroup = ({
  options,
  value,
  onChange,
  exclusive,
  ...rest
}) => {
  // this sshould be in theme eventually which should we expose in base theme?
  const toggleButtonGroupProps = {
    direction: 'row',
    margin: 'none',
    gap: 'none',
    border: true,
    round: 'xsmall',
  };
  const contextValue = useMemo(() => ({ inToggleButtonGroup: true }), []);
  const flatOptions = options.map((option) =>
    typeof option === 'object' ? option.label : option,
  );

  let content;

  if (exclusive) {
    content = (
      <ToggleButtonGroupContext.Provider value={contextValue}>
        <RadioButtonGroup
          name="radio"
          options={options}
          value={value}
          onChange={onChange}
          {...toggleButtonGroupProps}
          {...rest}
        >
          {(option, { checked }) => (
            <Box
              background={checked ? 'active-background' : undefined}
              border={
                flatOptions.indexOf(option.label || option) <
                flatOptions.length - 1
                  ? { side: 'right', color: 'border' }
                  : undefined
              }
              pad="xsmall"
            >
              {option.label || option}
            </Box>
          )}
        </RadioButtonGroup>
      </ToggleButtonGroupContext.Provider>
    );
  } else {
    content = (
      <ToggleButtonGroupContext.Provider value={contextValue}>
        <CheckBoxGroup
          name="checkBox"
          options={options}
          value={value}
          onChange={onChange}
          labelKey="label"
          {...toggleButtonGroupProps}
          {...rest}
        >
          {(option, { checked }) => (
            <Box
              // move this to theme?
              background={checked ? 'active-background' : undefined}
              border={
                flatOptions.indexOf(option.label || option) <
                flatOptions.length - 1
                  ? { side: 'right', color: 'border' }
                  : undefined
              }
              pad="xsmall"
            >
              {option.label || option.value}
            </Box>
          )}
        </CheckBoxGroup>
      </ToggleButtonGroupContext.Provider>
    );
  }

  return content;
};

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
export { ToggleButtonGroup };
