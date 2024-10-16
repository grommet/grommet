"use strict";

exports.__esModule = true;
exports.useDisabled = exports.getSelectIcon = exports.getOptionValue = exports.getOptionLabel = exports.getOptionIndex = exports.getNormalizedValue = exports.getIconColor = exports.getDisplayLabelKey = exports.changeEvent = exports.arrayIncludes = exports.applyKey = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var _applyKey = exports.applyKey = function applyKey(option, key) {
  if (/*#__PURE__*/_react["default"].isValidElement(option)) return option;
  if (option === undefined || option === null) return undefined;
  if (typeof key === 'object') return _applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined && typeof option === 'object') return option[key];
  if (typeof option === 'object' && Object.keys(option).length > 0) return option[Object.keys(option)[0]];
  return option;
};
var getOptionLabel = exports.getOptionLabel = function getOptionLabel(index, options, labelKey) {
  return _applyKey(options[index], labelKey);
};
var getOptionValue = exports.getOptionValue = function getOptionValue(index, options, valueKey) {
  return _applyKey(options[index], valueKey);
};
var getOptionIndex = exports.getOptionIndex = function getOptionIndex(options, i, valueKey) {
  if (options) {
    if (typeof i === 'object') return options.findIndex(function (x) {
      return _applyKey(x, valueKey) === _applyKey(i, valueKey);
    });
    return options.indexOf(i);
  }
  return undefined;
};
var arrayIncludes = exports.arrayIncludes = function arrayIncludes(arr, i, valueKey) {
  if (arr) {
    if (typeof i === 'object') return arr.some(function (x) {
      return _applyKey(x, valueKey) === _applyKey(i, valueKey);
    });
    return arr.includes(i);
  }
  return undefined;
};
var useDisabled = exports.useDisabled = function useDisabled(disabled, disabledKey, options, valueKey) {
  return (0, _react.useCallback)(function (index) {
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
var getNormalizedValue = exports.getNormalizedValue = function getNormalizedValue(value, valueKey) {
  if (Array.isArray(value)) return value.map(function (v) {
    return valueKey && valueKey.reduce ? v : _applyKey(v, valueKey);
  });
  return valueKey && valueKey.reduce ? value : _applyKey(value, valueKey);
};
var changeEvent = exports.changeEvent = function changeEvent(inputRef, nextValue) {
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
var getSelectIcon = exports.getSelectIcon = function getSelectIcon(icon, theme, open) {
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
var getDisplayLabelKey = exports.getDisplayLabelKey = function getDisplayLabelKey(labelKey, allOptions, optionIndexesInValue, selectValue) {
  var optionLabelKey = _applyKey(allOptions[optionIndexesInValue[0]], labelKey);
  if (!selectValue && optionIndexesInValue.length === 1 && typeof optionLabelKey === 'object') return optionLabelKey;
  return undefined;
};
var getIconColor = exports.getIconColor = function getIconColor(theme) {
  return (0, _utils.normalizeColor)(theme.select.icons.color || 'control', theme);
};