"use strict";

exports.__esModule = true;
exports.RadioButtonGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _Keyboard = require("../Keyboard");

var _RadioButton = require("../RadioButton");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RadioButtonGroup = (0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 'small' : _ref$gap,
      name = _ref.name,
      onChange = _ref.onChange,
      optionsProp = _ref.options,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "gap", "name", "onChange", "options", "value"]);

  // normalize options to always use an object
  var options = (0, _react.useMemo)(function () {
    return optionsProp.map(function (o) {
      return typeof o === 'string' ? {
        id: o,
        label: o,
        value: o
      } : o;
    });
  }, [optionsProp]);

  var _useState = (0, _react.useState)(valueProp),
      value = _useState[0],
      setValue = _useState[1];

  (0, _react.useEffect)(function () {
    return setValue(valueProp);
  }, [valueProp]);

  var _useState2 = (0, _react.useState)(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var optionRefs = (0, _react.useRef)([]);

  var valueIndex = _react["default"].useMemo(function () {
    var result;
    options.some(function (option, index) {
      if (option.value === value) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }, [options, value]);

  (0, _react.useEffect)(function () {
    if (focus && valueIndex >= 0) optionRefs.current[valueIndex].focus();
  }, [focus, valueIndex]);

  var onNext = function onNext() {
    if (valueIndex !== undefined && valueIndex < options.length - 1) {
      var nextIndex = valueIndex + 1;
      var nextValue = options[nextIndex].value;
      setValue(nextValue);

      if (onChange) {
        onChange({
          target: {
            value: nextValue
          }
        });
      }
    }
  };

  var onPrevious = function onPrevious() {
    if (valueIndex > 0) {
      var nextIndex = valueIndex - 1;
      var nextValue = options[nextIndex].value;
      setValue(nextValue);

      if (onChange) {
        onChange({
          target: {
            value: nextValue
          }
        });
      }
    }
  };

  var onFocus = function onFocus() {
    // Delay just a wee bit so Chrome doesn't missing turning the button on.
    // Chrome behaves differently in that focus is given to radio buttons
    // when the user selects one, unlike Safari and Firefox.
    setTimeout(function () {
      return !focus && setFocus(true);
    }, 1);
  };

  var onBlur = function onBlur() {
    return focus && setFocus(false);
  };

  return _react["default"].createElement(_Keyboard.Keyboard, {
    target: "document",
    onUp: focus ? onPrevious : undefined,
    onDown: focus ? onNext : undefined,
    onLeft: focus ? onPrevious : undefined,
    onRight: focus ? onNext : undefined
  }, _react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    gap: gap
  }, rest), options.map(function (_ref2, index) {
    var disabled = _ref2.disabled,
        id = _ref2.id,
        label = _ref2.label,
        optionValue = _ref2.value;
    return _react["default"].createElement(_RadioButton.RadioButton, {
      ref: function ref(aRef) {
        optionRefs.current[index] = aRef;
      },
      key: optionValue,
      name: name,
      label: !children ? label : undefined,
      disabled: disabled,
      checked: optionValue === value,
      focus: focus && (optionValue === value || value === undefined && !index),
      id: id,
      value: optionValue,
      onChange: onChange,
      onFocus: onFocus,
      onBlur: onBlur
    }, children ? function (state) {
      return children(optionsProp[index], state);
    } : null);
  })));
});
RadioButtonGroup.displayName = 'RadioButtonGroup';
var RadioButtonGroupDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RadioButtonGroupDoc = require('./doc').doc(RadioButtonGroup);
}

var RadioButtonGroupWrapper = RadioButtonGroupDoc || RadioButtonGroup;
exports.RadioButtonGroup = RadioButtonGroupWrapper;