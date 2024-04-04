import React, { useCallback, useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { ToggleButtonGroupPropTypes } from './propTypes';
import { StyledButton } from './StyledToggleButtonGroup';

const useControlled = ({ prop, defaultProp, onChange = () => {} }) => {
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  const controlled = prop !== undefined;
  const value = controlled ? prop : uncontrolledProp;
  const handleChange = useCallback(onChange, [onChange]);

  const setValue = useCallback(
    (nextValue) => {
      // only update internal value in uncontrolled cases
      if (!controlled) {
        setUncontrolledProp(nextValue);
      }
      handleChange(nextValue);
    },
    [controlled, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
};

const ToggleButtonGroup = ({
  defaultValue,
  multiple,
  options,
  onChange,
  value: valueProp,
  ...rest
}) => {
  const [value = multiple ? [] : '', setValue] = useControlled({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange,
  });
  const theme = useContext(ThemeContext);
  const ref = useRef();
  const buttonRefs = useRef([]);

  const values = options.map((option) =>
    typeof option === 'object' ? option.value : option,
  );

  const getFocusableIndex = useCallback(() => {
    let defaultIndex = 0;
    if (value.length) {
      // set earliest button that's part of value to active
      // assume that value might not be ordered the same as options
      defaultIndex = values.indexOf(
        values.find((option) => value.includes(option)),
      );
    }
    return defaultIndex;
  }, [value, values]);

  const [focusableIndex, setFocusableIndex] = useState(() =>
    getFocusableIndex(),
  );

  const onNext = (e) => {
    // prevent page scroll
    e.preventDefault();
    const nextIndex =
      focusableIndex + 1 <= options.length - 1 ? focusableIndex + 1 : 0;
    setFocusableIndex(nextIndex);
    buttonRefs.current[nextIndex].focus();
  };

  const onPrevious = (e) => {
    // prevent page scroll
    e.preventDefault();
    const nextIndex =
      focusableIndex - 1 >= 0 ? focusableIndex - 1 : options.length - 1;
    setFocusableIndex(nextIndex);
    buttonRefs.current[nextIndex].focus();
  };

  const handleToggle = (option, active) => {
    let nextValue;
    if (multiple) {
      if (Array.isArray(value)) {
        nextValue = active
          ? value.filter((item) => item !== option)
          : [...value, option];
      } else {
        nextValue = active ? [] : [option];
      }
    } else {
      nextValue = active ? '' : option;
    }
    setValue(nextValue);
  };

  return (
    <Keyboard
      onUp={onPrevious}
      onDown={onNext}
      onLeft={onPrevious}
      onRight={onNext}
    >
      <Box
        ref={ref}
        direction="row"
        alignSelf="start"
        role="group"
        onBlur={(e) => {
          if (!ref?.current.contains(e.relatedTarget)) {
            setFocusableIndex(getFocusableIndex());
          }
        }}
        {...theme.toggleButtonGroup.container}
        {...rest}
      >
        {options.map((option, index) => {
          let label;
          let icon;
          let optionValue;
          if (typeof option === 'object') {
            icon = option.icon;
            label = option.label;
            optionValue = option.value;
          } else {
            label = option;
            optionValue = option;
          }
          const active = Array.isArray(value)
            ? !!value.includes(optionValue)
            : value === optionValue;
          let round = 0;

          // round corners of first and last buttons to match container
          if (typeof theme.toggleButtonGroup.container.round === 'string') {
            if (index === 0) {
              round = {
                corner: 'right',
                size: 'none',
              };
            } else if (index === options.length - 1) {
              round = {
                corner: 'left',
                size: 'none',
              };
            }
          }

          return (
            <Box
              border={
                index < options.length - 1
                  ? {
                      side: 'right',
                      color: theme.toggleButtonGroup.divider.color,
                    }
                  : undefined
              }
              key={optionValue || index}
            >
              <StyledButton
                active={active}
                aria-checked={active}
                icon={icon}
                label={label}
                onClick={() => handleToggle(optionValue, active)}
                ref={(r) => {
                  buttonRefs.current[index] = r;
                }}
                role={!multiple ? 'radio' : undefined}
                round={round}
                tabIndex={index === focusableIndex ? '0' : '-1'}
              />
            </Box>
          );
        })}
      </Box>
    </Keyboard>
  );
};

ToggleButtonGroup.displayName = 'ToggleButtonGroup';
ToggleButtonGroup.propTypes = ToggleButtonGroupPropTypes;

export { ToggleButtonGroup };
