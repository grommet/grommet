"use strict";

exports.__esModule = true;
exports.useDisabled = exports.selectInputId = exports.inertTrueValue = exports.getSelectIcon = exports.getOptionValue = exports.getOptionLabel = exports.getOptionIndex = exports.getNormalizedValue = exports.getIconColor = exports.getDisplayLabelKey = exports.formatValueForA11y = exports.changeEvent = exports.arrayIncludes = exports.applyKey = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var _applyKey = exports.applyKey = function applyKey(option, key) {
  if (/*#__PURE__*/(0, _react.isValidElement)(option)) return option;
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
var _formatValueForA11y = exports.formatValueForA11y = function formatValueForA11y(value, labelKey) {
  if (typeof value === 'string') return value;
  if (/*#__PURE__*/(0, _react.isValidElement)(value)) return value.toString();
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return _formatValueForA11y(item, labelKey);
    }).join(', ');
  }
  return _applyKey(value, labelKey);
};

// In react 18 and below the inert attribute is not supported
// so we use an empty string instead of true. In react 19 and above
// inert is supported so we should use true. The use function is
// used to determine the react version because it is only available
// in react 19 and above.
var inertTrueValue = exports.inertTrueValue = _react["default"].use ? true : '';

// Grommet manipulates the provided id by appending "__input" for
// the id places on the DOM input. In order to properly associate
// form label htmlFor with select input, we handle appending this
// to htmlFor for internal components like DataSort and DataFilter.
// Caller is responsible for appending this on their Select or
// SelectMultiple instances.
var selectInputId = exports.selectInputId = function selectInputId(id) {
  return id + "__input";
};