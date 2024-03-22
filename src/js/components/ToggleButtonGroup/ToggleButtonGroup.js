import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { edgeStyle } from '../../utils/styles';

// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
const StyledButton = styled(Button)`
  border-radius: ${(props) => props.theme.global.control.border.radius};
  ${(props) =>
    !props.theme.button.default
      ? edgeStyle('padding', props.pad, false, undefined, props.theme)
      : ''}
`;

// default
// make sure defaultValue html native behavior works? if it does work maybe not having defaultOption

const ToggleButtonGroup = ({
  options,
  onChange,
  multiple,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleToggle = (option) => {
    if (!multiple) {
      setSelectedOption([option]);
      if (onChange) {
        onChange([option]);
      }
    } else {
      const newSelectedOptions = selectedOption.includes(option)
        ? selectedOption.filter((item) => item !== option)
        : [...selectedOption, option];

      setSelectedOption(newSelectedOptions);
      if (onChange) {
        onChange(newSelectedOptions);
      }
    }
  };

  const flatOptions = options.map((option) =>
    typeof option === 'object' ? option.label : option,
  );

  return (
    <Keyboard target="document">
      <Box
        round="xsmall"
        direction="row"
        border
        style={{ width: 'fit-content' }}
      >
        {options.map((option, index) => (
            <Box
              key={index}
              role="group"
              // should have color in theme
              border={
                flatOptions.indexOf(option.label || option) <
                flatOptions.length - 1
                  ? { side: 'right', color: 'border' }
                  : undefined
              }
              {...rest}
            >
              <StyledButton
                role="radio"
                onClick={() => handleToggle(option)}
                icon={option.label}
                label={option.label ? undefined : option}
                pad="small"
                onChange={onChange}
              />
            </Box>
          ))}
      </Box>
    </Keyboard>
  );
};

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
// ToggleButtonGroup.propTypes = ToggleButtonGroupPropTypes;

export { ToggleButtonGroup };
