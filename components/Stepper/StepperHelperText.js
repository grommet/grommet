"use strict";

exports.__esModule = true;
exports.StepperError = exports.StepperDisabledReason = void 0;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _StepperContext = require("./StepperContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["variant"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StepperHelperText = function StepperHelperText(_ref) {
  var _theme$stepper, _theme$stepper2;
  var variant = _ref.variant,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var helperTextProps = (_theme$stepper = theme.stepper) == null ? void 0 : _theme$stepper.helperText;
  var variantProps = variant ? ((_theme$stepper2 = theme.stepper) == null || (_theme$stepper2 = _theme$stepper2[variant]) == null ? void 0 : _theme$stepper2.helperText) || {} : {};
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, helperTextProps, variantProps, rest));
};
var StepperError = exports.StepperError = function StepperError(_ref2) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  var _useStepItem = (0, _StepperContext.useStepItem)(),
    step = _useStepItem.step;
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  return /*#__PURE__*/_react["default"].createElement(StepperHelperText, _extends({
    id: "stepper-error-" + step.id,
    role: "alert",
    variant: "error"
  }, rest), step.errorMessage);
};
var StepperDisabledReason = exports.StepperDisabledReason = function StepperDisabledReason(_ref3) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  var _useStepItem2 = (0, _StepperContext.useStepItem)(),
    step = _useStepItem2.step;
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return /*#__PURE__*/_react["default"].createElement(StepperHelperText, _extends({
    id: "stepper-reason-" + step.id,
    variant: "disabled"
  }, rest), step.disabledReason);
};