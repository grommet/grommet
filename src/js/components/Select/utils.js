import styled from 'styled-components';

export const applyKey = (option, key) => {
  if (option === undefined) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined) return option[key];
  return option;
};

export const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  outline: none;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const optionLabel = (index, options, labelKey) =>
  applyKey(options[index], labelKey);

export const optionValue = (index, options, valueKey) =>
  applyKey(options[index], valueKey);

export const isDisabled = (index, disabled, disabledKey, options, valueKey) => {
  const option = options[index];
  let result;
  if (disabledKey) {
    result = applyKey(option, disabledKey);
  } else if (Array.isArray(disabled)) {
    if (typeof disabled[0] === 'number') {
      result = disabled.indexOf(index) !== -1;
    } else {
      const optionVal = optionValue(index, options, valueKey);
      result = disabled.indexOf(optionVal) !== -1;
    }
  }
  return result;
};

export const isSelected = (index, value, valueKey, labelKey, options) => {
  let result;
  const optionVal = optionValue(index, options, labelKey);
  if (Array.isArray(value)) {
    if (value.length === 0) {
      result = false;
    } else if (typeof value[0] !== 'object') {
      result = value.indexOf(optionVal) !== -1;
    } else if (valueKey) {
      result = value.some((valueItem) => {
        const valueValue =
          typeof valueKey === 'function'
            ? valueKey(valueItem)
            : valueItem[valueKey];
        return valueValue === optionVal;
      });
    }
  } else if (valueKey && typeof value === 'object') {
    const valueValue =
      typeof valueKey === 'function' ? valueKey(value) : value[valueKey];
    result = valueValue === optionVal;
  } else {
    result = value === optionVal;
  }
  return result;
};
