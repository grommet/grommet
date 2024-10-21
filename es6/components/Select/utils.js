import { useCallback, isValidElement } from 'react';
import { normalizeColor } from '../../utils';
var _applyKey = function applyKey(option, key) {
  if (/*#__PURE__*/isValidElement(option)) return option;
  if (option === undefined || option === null) return undefined;
  if (typeof key === 'object') return _applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined && typeof option === 'object') return option[key];
  if (typeof option === 'object' && Object.keys(option).length > 0) return option[Object.keys(option)[0]];
  return option;
};
export { _applyKey as applyKey };
export var getOptionLabel = function getOptionLabel(index, options, labelKey) {
  return _applyKey(options[index], labelKey);
};
export var getOptionValue = function getOptionValue(index, options, valueKey) {
  return _applyKey(options[index], valueKey);
};
export var getOptionIndex = function getOptionIndex(options, i, valueKey) {
  if (options) {
    if (typeof i === 'object') return options.findIndex(function (x) {
      return _applyKey(x, valueKey) === _applyKey(i, valueKey);
    });
    return options.indexOf(i);
  }
  return undefined;
};
export var arrayIncludes = function arrayIncludes(arr, i, valueKey) {
  if (arr) {
    if (typeof i === 'object') return arr.some(function (x) {
      return _applyKey(x, valueKey) === _applyKey(i, valueKey);
    });
    return arr.includes(i);
  }
  return undefined;
};
export var useDisabled = function useDisabled(disabled, disabledKey, options, valueKey) {
  return useCallback(function (index) {
    var option = options[index];
    var result;
    if (disabledKey) {
      result = _applyKey(option, disabledKey);
    } else if (Array.isArray(disabled)) {
      if (typeof disabled[0] === 'number') {
        result = disabled.indexOf(index) !== -1;
      } else {
        var optionVal = getOptionValue(index, options, valueKey);
        result = getOptionIndex(disabled, options[index], valueKey) !== -1 || getOptionIndex(disabled, optionVal, valueKey) !== -1;
      }
    }
    return result;
  }, [disabled, disabledKey, options, valueKey]);
};
export var getNormalizedValue = function getNormalizedValue(value, valueKey) {
  if (Array.isArray(value)) return value.map(function (v) {
    return valueKey && valueKey.reduce ? v : _applyKey(v, valueKey);
  });
  return valueKey && valueKey.reduce ? value : _applyKey(value, valueKey);
};
export var changeEvent = function changeEvent(inputRef, nextValue) {
  // Calling set value function directly on input because React library
  // overrides setter `event.target.value =` and loses original event
  // target fidelity.
  // https://stackoverflow.com/a/46012210
  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  nativeInputValueSetter.call(inputRef.current, nextValue);
  var event = new Event('input', {
    bubbles: true
  });
  inputRef.current.dispatchEvent(event);
};
export var getSelectIcon = function getSelectIcon(icon, theme, open) {
  var SelectIcon;
  switch (icon) {
    case false:
      break;
    case true:
    case undefined:
      SelectIcon = open && theme.select.icons.up ? theme.select.icons.up : theme.select.icons.down;
      break;
    default:
      SelectIcon = icon;
  }
  return SelectIcon;
};

// if labelKey is a function and valueLabel is not defined
// we should use the labelKey function to display the
// selected value
export var getDisplayLabelKey = function getDisplayLabelKey(labelKey, allOptions, optionIndexesInValue, selectValue) {
  var optionLabelKey = _applyKey(allOptions[optionIndexesInValue[0]], labelKey);
  if (!selectValue && optionIndexesInValue.length === 1 && typeof optionLabelKey === 'object') return optionLabelKey;
  return undefined;
};
export var getIconColor = function getIconColor(theme) {
  return normalizeColor(theme.select.icons.color || 'control', theme);
};
var _formatValueForA11y = function formatValueForA11y(value, labelKey) {
  if (typeof value === 'string') return value;
  if (/*#__PURE__*/isValidElement(value)) return value.toString();
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return _formatValueForA11y(item, labelKey);
    }).join(', ');
  }
  return _applyKey(value, labelKey);
};
export { _formatValueForA11y as formatValueForA11y };