"use strict";

exports.__esModule = true;
exports.CheckBoxGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CheckBox = require("../CheckBox");
var _FormContext = require("../Form/FormContext");
var _StyledCheckBoxGroup = require("./StyledCheckBoxGroup");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["children", "defaultValue", "value", "disabled", "focusIndicator", "gap", "labelKey", "valueKey", "onChange", "options", "name"],
  _excluded2 = ["value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CheckBoxGroup = exports.CheckBoxGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    defaultValue = _ref.defaultValue,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;

  // In case option is a string, normalize it to be an object
  var options = optionsProp.map(function (option) {
    return typeof option === 'string' ? {
      disabled: disabledProp,
      value: option,
      label: option
    } : option;
  });

  // 'value' is an array of checked valueKeys
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: defaultValue || []
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];

  // Logic is necessary to maintain a proper data structure for Form logic
  var onCheckBoxChange = function onCheckBoxChange(event, optionValue, option) {
    // deep copy of value
    var nextValue = JSON.parse(JSON.stringify(value)) || [];
    var optionIndex = nextValue.indexOf(optionValue);
    // If the value option isn't in the array, add it.
    // Otherwise, remove it.
    if (optionIndex < 0) nextValue.push(optionValue);else nextValue.splice(optionIndex, 1);
    setValue(nextValue);
    // Similar functionality to Select onChange()
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
  }, passThemeFlag, rest), options.map(function (option, index) {
    var optionValue = option.value;
    var label = labelKey ? option[labelKey] : option.label;
    var valueOption = valueKey ? option[valueKey] : optionValue;
    var checked = value.indexOf(valueOption) >= 0;
    var disabled = disabledProp || option.disabled;
    var key = label + "-" + valueOption;
    if (option.checked) console.warn(// eslint-disable-next-line max-len
    "'checked' prop of an individual CheckBox shouldn't be used in a CheckBoxGroup component. Use the CheckBoxGroup 'value' prop instead.");
    // value shouldn't propagate the input field and the onChange option
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
      checked: checked
      // when contained in a FormField, focusIndicator = false,
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
CheckBoxGroup.displayName = 'CheckBoxGroup';
CheckBoxGroup.propTypes = _propTypes.CheckBoxGroupPropTypes;