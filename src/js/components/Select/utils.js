import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { normalizeColor } from '../../utils';
import { SelectOption, SelectTextInput } from './StyledSelect';

export const applyKey = (option, key) => {
  if (option === undefined) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined) return option[key];
  if (typeof option === 'object' && Object.keys(option))
    return option[Object.keys(option)[0]];
  return option;
};

export const DefaultSelectTextInput = forwardRef(
  (
    { a11yTitle, disabled, id, name, placeholder, value, size, theme, ...rest },
    ref,
  ) => (
    <SelectTextInput
      a11yTitle={a11yTitle}
      // When Select is disabled, we want to show a default cursor
      // but not have disabled styling come from TextInput
      // Disabled can be a bool or an array of options to disable.
      // We only want to disable the TextInput if the control
      // button should be disabled which occurs when disabled
      // equals true.
      defaultCursor={disabled === true || undefined}
      focusIndicator={false}
      id={id ? `${id}__input` : undefined}
      name={name}
      ref={ref}
      {...rest}
      tabIndex="-1"
      type="text"
      placeholder={placeholder}
      plain
      readOnly
      value={value}
      size={size}
      theme={theme}
    />
  ),
);

export const EmptySearchOption = ({
  emptySearchMessage,
  selectOptionsStyle,
  theme,
}) => (
  <SelectOption
    key="search_empty"
    tabIndex="0"
    role="menuitem"
    hoverIndicator="background"
    disabled
    aria-live="polite"
  >
    <Box {...selectOptionsStyle}>
      <Text {...theme.select.container.text}>{emptySearchMessage}</Text>
    </Box>
  </SelectOption>
);

export const getOptionLabel = (index, options, labelKey) =>
  applyKey(options[index], labelKey);

export const getOptionValue = (index, options, valueKey) =>
  applyKey(options[index], valueKey);

export const checkDisabled = (
  index,
  disabled,
  disabledKey,
  options,
  valueKey,
) => {
  const option = options[index];
  let result;
  if (disabledKey) {
    result = applyKey(option, disabledKey);
  } else if (Array.isArray(disabled)) {
    if (typeof disabled[0] === 'number') {
      result = disabled.indexOf(index) !== -1;
    } else {
      const optionVal = getOptionValue(index, options, valueKey);
      result = disabled.indexOf(optionVal) !== -1;
    }
  }
  return result;
};

export const getNormalizedValue = (value, valueKey) => {
  if (Array.isArray(value))
    return value.map((v) =>
      valueKey && valueKey.reduce ? v : applyKey(v, valueKey),
    );
  return valueKey && valueKey.reduce ? value : applyKey(value, valueKey);
};

export const changeEvent = (inputRef, nextValue) => {
  // Calling set value function directly on input because React library
  // overrides setter `event.target.value =` and loses original event
  // target fidelity.
  // https://stackoverflow.com/a/46012210
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  ).set;
  nativeInputValueSetter.call(inputRef.current, nextValue);
  const event = new Event('input', { bubbles: true });
  inputRef.current.dispatchEvent(event);
};

export const getSelectIcon = (icon, theme, open) => {
  let SelectIcon;
  switch (icon) {
    case false:
      break;
    case true:
    case undefined:
      SelectIcon =
        open && theme.select.icons.up
          ? theme.select.icons.up
          : theme.select.icons.down;
      break;
    default:
      SelectIcon = icon;
  }
  return SelectIcon;
};

// if labelKey is a function and valueLabel is not defined
// we should use the labelKey function to display the
// selected value
export const getDisplayLabelKey = (
  labelKey,
  allOptions,
  optionIndexesInValue,
  selectValue,
) => {
  const optionLabelKey = applyKey(
    allOptions[optionIndexesInValue[0]],
    labelKey,
  );
  if (
    !selectValue &&
    optionIndexesInValue.length === 1 &&
    typeof optionLabelKey === 'object'
  )
    return optionLabelKey;
  return undefined;
};

export const getIconColor = (theme) =>
  normalizeColor(theme.select.icons.color || 'control', theme);
