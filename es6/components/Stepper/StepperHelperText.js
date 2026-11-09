var _excluded = ["variant"];
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepItem, useStepper } from './StepperContext';
import { useStepTheme } from './utils';
var StepperHelperText = function StepperHelperText(_ref) {
  var variant = _ref.variant,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useStepItem = useStepItem(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  var stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;
  return /*#__PURE__*/React.createElement(Text, _extends({}, stepTheme[variant], rest));
};
export var StepperError = function StepperError(_ref2) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref2), _ref2));
  var _useStepItem2 = useStepItem(),
    step = _useStepItem2.step;
  var _useStepper = useStepper(),
    errorAnnouncement = _useStepper.errorAnnouncement;
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  var role;
  if (errorAnnouncement === 'polite') role = 'status';
  if (errorAnnouncement === 'assertive') role = 'alert';
  return /*#__PURE__*/React.createElement(StepperHelperText, _extends({
    id: "stepper-error-" + step.id,
    role: role,
    variant: "errorText"
  }, rest), step.errorMessage);
};
export var StepperDisabledReason = function StepperDisabledReason(_ref3) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  var _useStepItem3 = useStepItem(),
    step = _useStepItem3.step;
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return /*#__PURE__*/React.createElement(StepperHelperText, _extends({
    id: "stepper-reason-" + step.id,
    variant: "disabledReason"
  }, rest), step.disabledReason);
};