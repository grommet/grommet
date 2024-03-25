import React, { useContext, useEffect, useState, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
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
// make sure defaultValue html native behavior works?
// if it does work maybe not having defaultOption

const ToggleButtonGroup = ({
  focusIndicator = true,
  multiple,
  options,
  onChange,
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = useState([]);
  const [valueIndex, setValueIndex] = useState(0);
  const theme = useContext(ThemeContext);

  const buttonRefs = useRef([]);

  useEffect(() => {
    if (buttonRefs.current && buttonRefs.current[valueIndex]) {
      buttonRefs.current[valueIndex].focus();
    }
  }, [valueIndex]);

  const onNext = () => {
    if (valueIndex !== undefined && valueIndex < options.length - 1) {
      const nextIndex = valueIndex + 1;
      setValueIndex(nextIndex);
    }
  };

  const onPrevious = () => {
    if (valueIndex > 0) {
      const nextIndex = valueIndex - 1;
      setValueIndex(nextIndex);
    }
  };

  const handleToggle = (option) => {
    if (!multiple) {
      setValue([option]);
      if (onChange) {
        onChange([option]);
      }
    } else {
      const newSelectedOptions = value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option];

      setValue(newSelectedOptions);
      if (onChange) {
        onChange(newSelectedOptions);
      }
    }
  };

  const flatOptions = options.map((option) =>
    typeof option === 'object' ? option.label : option,
  );

  return (
    <Keyboard
      onUp={onPrevious}
      onDown={onNext}
      onLeft={onPrevious}
      onRight={onNext}
    >
      <Box
        direction="row"
        alignSelf="start"
        border
        {...theme.toggleButtonGroup.container}
        {...rest}
      >
        {options.map((option, index) => (
          <Box
            key={option.value || option || index}
            role="group"
            focusIndicator={focusIndicator}
            border={
              flatOptions.indexOf(option.label || option) <
              flatOptions.length - 1
                ? { side: 'right', color: theme.toggleButtonGroup.border.color }
                : undefined
            }
          >
            <StyledButton
              role="radio"
              pad="small"
              key={option || option.label}
              onClick={() => handleToggle(option)}
              tabIndex={index === valueIndex ? '0' : '-1'}
              icon={option.label ? option.label : undefined}
              label={option.label ? undefined : option}
              onChange={onChange}
              value={valueProp}
              ref={(r) => {
                buttonRefs.current[index] = r;
              }}
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
