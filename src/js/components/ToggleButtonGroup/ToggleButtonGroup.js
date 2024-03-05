import React, { useMemo } from 'react';
import { ToggleButtonGroupContext } from './ToggleButtonGroupContext';
import { Box } from '../Box';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { CheckBoxGroup } from '../CheckBoxGroup';

const ToggleButtonGroup = ({ options, value, onChange, type, ...rest }) => {
  // this sshould be in theme eventtuually which should we expose in base theme?
  const toggleButtonGroupProps = {
    direction: 'row',
    margin: 'none',
    gap: 'none',
    border: true,
    round: 'xsmall',
  };
  const contextValue = useMemo(() => ({ inToggleButtonGroup: true }), []);

  let content;

  if (type === 'single') {
    content = (
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
            // take off border on last option
            border={{ side: 'right' }}
            pad="xsmall"
          >
            {option.label || option}
          </Box>
        )}
      </RadioButtonGroup>
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
              // take off border on last option
              border={{ side: 'right' }}
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
