import styled from 'styled-components';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';
import {
  getHoverIndicatorStyle,
  selectedStyle,
  controlBorderStyle,
  normalizeColor,
} from '../../utils';

export const applyKey = (option, key) => {
  if (option === undefined) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined) return option[key];
  return option;
};

// position relative is so scroll can be managed correctly
export const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  outline: none;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const SelectOption = styled(Button)`
  ${(props) => props.selected && props.textComponent && selectedStyle}
  // applies theme.global.hover.background to the active
  // option for mouse and keyboard interactions
  ${(props) =>
    props.active &&
    getHoverIndicatorStyle(
      !props.children && !props.theme.select.options ? undefined : 'background',
      props.theme,
    )}
  display: block;
  width: 100%;
`;

export const SelectTextInput = styled(TextInput)`
  cursor: ${(props) => (props.defaultCursor ? 'default' : 'pointer')};
`;

export const StyledSelectDropButton = styled(DropButton)`
  ${(props) => !props.callerPlain && controlBorderStyle};
  ${(props) =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${(props) => props.open && props.theme.select.control.open};
`;

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

// valuedValue is the value mapped with any valueKey applied
// When the options array contains objects, this property indicates how
// to retrieve the value of each option.
// If a string is provided, it is used as the key to retrieve a
// property of an option object.
// If a function is provided, it is called with the option and should
// return the value.
// If reduce is true, this value will be used for the 'value'
// delivered via 'onChange'.
export const calcValuedValue = (value, valueKey) => {
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
