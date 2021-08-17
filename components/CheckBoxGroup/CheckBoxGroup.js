"use strict";

exports.__esModule = true;
exports.CheckBoxGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _CheckBox = require("../CheckBox");

var _FormContext = require("../Form/FormContext");

var _StyledCheckBoxGroup = require("./StyledCheckBoxGroup");

var _propTypes = require("./propTypes");

var _excluded = ["children", "value", "disabled", "focusIndicator", "gap", "labelKey", "valueKey", "onChange", "options", "name"],
    _excluded2 = ["value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CheckBoxGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      valueProp = _ref.value,
      disabledProp = _ref.disabled,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      gap = _ref.gap,
      labelKey = _ref.labelKey,
      valueKey = _ref.valueKey,
      onChange = _ref.onChange,
      optionsProp = _ref.options,
      name = _ref.name,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme; // In case option is a string, normalize it to be an object

  var options = optionsProp.map(function (option) {
    return typeof option === 'string' ? {
      disabled: disabledProp,
      value: option,
      label: option
    } : option;
  }); // 'value' is an array of checked valueKeys

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
    ref: ref,
    role: "group"
  }, theme.checkBoxGroup.container, {
    gap: gap || (theme.checkBoxGroup.container && theme.checkBoxGroup.container.gap ? theme.checkBoxGroup.container.gap : 'small') // consistent with RadioButtonGroup default

  }, rest), options.map(function (option, index) {
    var optionValue = option.value;
    var label = labelKey ? option[labelKey] : option.label;
    var valueOption = valueKey ? option[valueKey] : optionValue;
    var checked = value.indexOf(valueOption) >= 0;
    var disabled = disabledProp || option.disabled;
    var key = label + "-" + valueOption;
    if (option.checked) console.warn( // eslint-disable-next-line max-len
    "'checked' prop of an individual CheckBox shouldn't be used in a CheckBoxGroup component. Use the CheckBoxGroup 'value' prop instead."); // value shouldn't propagate the input field and the onChange option

    var omit = option.value,
        optionRest = _objectWithoutPropertiesLoose(option, _excluded2);

    var optionProps = _extends({}, optionRest, {
      label: label,
      disabled: disabled
    });

    return /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, _extends({
      key: key
    }, optionProps, {
      disabled: disabled,
      checked: checked // when contained in a FormField, focusIndicator = false,
      // so that the FormField has focus style. However, we still
      // need to visually indicate when a CheckBox is active.
      // In CheckBox, if focus = true but focusIndicator = false,
      // we will apply the hover treament.
      ,
      focusIndicator: focusIndicator,
      label: label,
      onChange: function onChange(event) {
        return onCheckBoxChange(event, valueOption, optionProps);
      }
    }), children ? function (state) {
      return children(options[index], state);
    } : null);
  }));
});
exports.CheckBoxGroup = CheckBoxGroup;
CheckBoxGroup.displayName = 'CheckBoxGroup';
CheckBoxGroup.propTypes = _propTypes.CheckBoxGroupPropTypes;