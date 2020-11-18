"use strict";

exports.__esModule = true;
exports.RadioButtonGroup = exports.CheckBoxGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _CheckBox = require("../CheckBox");

var _FormContext = require("../Form/FormContext");

var _StyledCheckBoxGroup = require("./StyledCheckBoxGroup");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CheckBoxGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var valueProp = _ref.value,
      disabledProp = _ref.disabled,
      gap = _ref.gap,
      labelKey = _ref.labelKey,
      valueKey = _ref.valueKey,
      onChange = _ref.onChange,
      optionsProp = _ref.options,
      name = _ref.name,
      rest = _objectWithoutPropertiesLoose(_ref, ["value", "disabled", "gap", "labelKey", "valueKey", "onChange", "options", "name"]);

  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme; // In case option is a string, normalize it to be an object

  var options = (0, _react.useMemo)(function () {
    return optionsProp.map(function (option) {
      return typeof option === 'string' ? {
        disabled: disabledProp,
        value: option,
        label: option
      } : option;
    });
  }, [optionsProp, disabledProp]); // 'value' is an array of checked valueKeys

  var _formContext$useFormI = formContext.useFormInput(name, valueProp, []),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1]; // Logic is necessary to maintain a proper data structure for Form logic


  var onCheckBoxChange = function onCheckBoxChange(event, optionValue, option) {
    // deep copy of value
    var nextValue = JSON.parse(JSON.stringify(value)) || [];
    var optionIndex = nextValue.indexOf(optionValue); // If the value option isn't in the array, add it.
    // Otherwise, remove it.

    if (optionIndex < 0) nextValue.push(optionValue);else nextValue.splice(optionIndex, 1);
    setValue(nextValue); // Similar functionality to Select onChange()

    if (onChange) {
      event.persist(); // extract from React synthetic event pool

      var adjustedEvent = event;
      adjustedEvent.value = nextValue;
      adjustedEvent.option = option;
      onChange(adjustedEvent);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_StyledCheckBoxGroup.StyledCheckBoxGroup, _extends({
    ref: ref
  }, theme.checkBoxGroup.container, {
    gap: gap || (theme.checkBoxGroup.container && theme.checkBoxGroup.container.gap ? theme.checkBoxGroup.container.gap : 'small') // consistent with RadioButtonGroup default

  }, rest), options.map(function (option) {
    var optionValue = option.value;
    var label = labelKey ? option[labelKey] : option.label;
    var valueOption = valueKey ? option[valueKey] : optionValue;
    var checked = value.indexOf(valueOption) >= 0;
    var disabled = disabledProp || option.disabled;
    var key = label + "-" + valueOption;
    if (option.checked) console.warn( // eslint-disable-next-line max-len
    "'checked' prop of an individual CheckBox shouldn't be used in a CheckBoxGroup component. Use the CheckBoxGroup 'value' prop instead."); // value shouldn't propagate the input field and the onChange option

    var omit = option.value,
        optionRest = _objectWithoutPropertiesLoose(option, ["value"]);

    var optionProps = _extends({}, optionRest, {
      label: label,
      disabled: disabled
    });

    return /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, _extends({
      key: key
    }, optionProps, {
      disabled: disabled,
      checked: checked,
      label: label,
      onChange: function onChange(event) {
        return onCheckBoxChange(event, valueOption, optionProps);
      }
    }));
  }));
});
exports.CheckBoxGroup = CheckBoxGroup;
CheckBoxGroup.displayName = 'CheckBoxGroup';
var CheckBoxGroupDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CheckBoxGroupDoc = require('./doc').doc(CheckBoxGroup);
}

var RadioButtonGroupWrapper = CheckBoxGroupDoc || CheckBoxGroup;
exports.RadioButtonGroup = RadioButtonGroupWrapper;