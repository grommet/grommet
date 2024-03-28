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

const ToggleButtonGroup = ({
  multiple,
  name: nameProp,
  options,
  onChange,
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = useState(valueProp || []);
  const [valueIndex, setValueIndex] = useState(null);
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
    typeof option === 'object' ? option.label || option.icon : option,
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
        role="group"
        {...theme.toggleButtonGroup.container}
        {...rest}
      >
        {options.map((option, index) => {
          const id = typeof option === 'object' ? option.id : null;
          let label;
          if (typeof option === 'object') {
            label = option.label;
          } else label = option;
          const optionValue =
            typeof option === 'object' ? option.value : option;
          const icon = typeof option === 'object' ? option.icon : null;

          let isActive;
          if (valueProp === undefined) {
            isActive = !!value.includes(optionValue);
          } else if (valueProp !== undefined)
            isActive = !!valueProp.includes(optionValue);
          else isActive = false;

          return (
            <Box
              border={
                flatOptions.indexOf(icon || label || optionValue) <
                flatOptions.length - 1
                  ? {
                      side: 'right',
                      color: theme.toggleButtonGroup.border.color,
                    }
                  : undefined
              }
              key={id || optionValue || index}
            >
              <StyledButton
                active={isActive}
                aria-checked={isActive}
                icon={icon}
                kind={theme.toggleButtonGroup.button}
                label={label}
                name={nameProp}
                onChange={onChange}
                onClick={() => handleToggle(optionValue)}
                pad="small"
                ref={(r) => {
                  buttonRefs.current[index] = r;
                }}
                role={!multiple ? 'radio' : undefined}
                tabIndex={
                  index === valueIndex || (valueIndex === null && index === 0)
                    ? '0'
                    : '-1'
                }
              />
            </Box>
          );
        })}
      </Box>
    </Keyboard>
  );
};

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
// ToggleButtonGroup.propTypes = ToggleButtonGroupPropTypes;

export { ToggleButtonGroup };
