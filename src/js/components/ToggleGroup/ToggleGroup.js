import React, { useCallback, useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { ToggleGroupPropTypes } from './propTypes';
import { StyledButton } from './StyledToggleGroup';

const useControlled = ({ prop, defaultProp, onChange = () => {} }) => {
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  const controlled = prop !== undefined;
  const value = controlled ? prop : uncontrolledProp;
  const handleChange = useCallback(onChange, [onChange]);

  const setValue = useCallback(
    (event) => {
      // only update internal value in uncontrolled cases
      if (!controlled) {
        setUncontrolledProp(event.value);
      }
      handleChange(event);
    },
    [controlled, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
};

const ToggleGroup = ({
  defaultValue,
  multiple,
  options,
  onToggle,
  value: valueProp,
  ...rest
}) => {
  const [value = multiple ? [] : '', setValue] = useControlled({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onToggle,
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

  const handleToggle = (event, option) => {
    const adjustedEvent = event;
    let nextValue;
    if (!multiple) {
      nextValue = option;
    } else {
      nextValue = value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option];
    }
    adjustedEvent.value = nextValue;
    setValue(adjustedEvent);
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
        role={multiple ? 'group' : 'radiogroup'}
        onBlur={(e) => {
          if (!ref?.current.contains(e.relatedTarget)) {
            setFocusableIndex(getFocusableIndex());
          }
        }}
        {...theme.toggleGroup.container}
        // match button rounding
        responsive={false}
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
          if (
            typeof theme.toggleGroup.container.round === 'string' &&
            (index === 0 || index === options.length - 1)
          ) {
            round = {
              corner: index === 0 ? 'left' : 'right',
              size: theme.toggleGroup.container.round,
            };
          }

          const iconOnly = icon && !label;
          let pad;
          if (iconOnly && theme.toggleGroup.button?.iconOnly?.pad) {
            pad = theme.toggleGroup.button.iconOnly.pad;
          } else pad = theme.toggleGroup.button.pad;

          return (
            <Box
              border={
                index < options.length - 1
                  ? {
                      side: 'right',
                      color: theme.toggleGroup.divider.color,
                    }
                  : undefined
              }
              key={optionValue || index}
            >
              <StyledButton
                active={active}
                aria-pressed={multiple && active}
                aria-checked={!multiple && active}
                icon={icon}
                label={label}
                onClick={(event) => handleToggle(event, optionValue)}
                ref={(r) => {
                  buttonRefs.current[index] = r;
                }}
                role={!multiple ? 'radio' : undefined}
                round={round}
                tabIndex={index === focusableIndex ? '0' : '-1'}
                pad={pad}
              />
            </Box>
          );
        })}
      </Box>
    </Keyboard>
  );
};

ToggleGroup.displayName = 'ToggleGroup';
ToggleGroup.propTypes = ToggleGroupPropTypes;

export { ToggleGroup };
