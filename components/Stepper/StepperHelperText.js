"use strict";

exports.__esModule = true;
exports.StepperError = exports.StepperDisabledReason = void 0;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _StepperContext = require("./StepperContext");
var _utils = require("./utils");
var _excluded = ["variant"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StepperHelperText = function StepperHelperText(_ref) {
  var variant = _ref.variant,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useStepItem = (0, _StepperContext.useStepItem)(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  var stepTheme = (0, _utils.useStepTheme)(step, isSubStep);
  if (!step) return null;
  return /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, stepTheme[variant], rest));
};
var StepperError = exports.StepperError = function StepperError(_ref2) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  var _useStepItem2 = (0, _StepperContext.useStepItem)(),
    step = _useStepItem2.step;
  var _useStepper = (0, _StepperContext.useStepper)(),
    errorAnnouncement = _useStepper.errorAnnouncement;
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  var role;
  if (errorAnnouncement === 'polite') role = 'status';
  if (errorAnnouncement === 'assertive') role = 'alert';
  return /*#__PURE__*/_react["default"].createElement(StepperHelperText, _extends({
    id: "stepper-error-" + step.id,
    role: role,
    variant: "errorText"
  }, rest), step.errorMessage);
};
var StepperDisabledReason = exports.StepperDisabledReason = function StepperDisabledReason(_ref3) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  var _useStepItem3 = (0, _StepperContext.useStepItem)(),
    step = _useStepItem3.step;
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return /*#__PURE__*/_react["default"].createElement(StepperHelperText, _extends({
    id: "stepper-reason-" + step.id,
    variant: "disabledReason"
  }, rest), step.disabledReason);
};