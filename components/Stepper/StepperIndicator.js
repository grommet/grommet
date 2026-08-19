"use strict";

exports.__esModule = true;
exports.StepperIndicator = void 0;
exports.getEffectiveState = getEffectiveState;
var _react = _interopRequireDefault(require("react"));
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StepperContext = require("./StepperContext");
var _StyledStepper = require("./StyledStepper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var renderIcon = function renderIcon(Icon, props) {
  if (!Icon) return null;
  var iconProps = _extends({
    color: 'currentColor'
  }, props);
  if (/*#__PURE__*/_react["default"].isValidElement(Icon)) {
    return /*#__PURE__*/_react["default"].cloneElement(Icon, _extends({}, iconProps, {
      'aria-hidden': true
    }));
  }
  return /*#__PURE__*/_react["default"].createElement(Icon, _extends({}, iconProps, {
    "aria-hidden": true
  }));
};

// Maps step status + current position to a visual state
// used by both the indicator and label components.
function getEffectiveState(status, isCurrent) {
  if (status === 'disabled') return 'disabled';
  if (isCurrent) {
    if (status === 'completed') return 'currentCompleted';
    if (status === 'error') return 'currentError';
    return 'current';
  }
  if (status === 'completed') return 'completed';
  if (status === 'error') return 'error';
  return 'pending';
}
var StepperIndicator = exports.StepperIndicator = function StepperIndicator(_ref) {
  var _step$children, _theme$stepper, _stateTheme, _stateTheme2;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useStepper = (0, _StepperContext.useStepper)(),
    currentStep = _useStepper.currentStep,
    clickableSteps = _useStepper.clickableSteps;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useStepItem = (0, _StepperContext.useStepItem)(),
    step = _useStepItem.step,
    isSubStep = _useStepItem.isSubStep;
  if (!step) return null;
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var effectiveState = getEffectiveState(step.status, isHighlighted);
  var stateTheme = ((_theme$stepper = theme.stepper) == null || (_theme$stepper = _theme$stepper[effectiveState]) == null ? void 0 : _theme$stepper.indicator) || {};
  if (isSubStep && stateTheme.substep) {
    stateTheme = _extends({}, stateTheme, stateTheme.substep);
  }
  var isDisabled = step.status === 'disabled';
  var isClickable = clickableSteps && !isDisabled;
  var iconSize = ((_stateTheme = stateTheme) == null ? void 0 : _stateTheme.iconSize) || (isSubStep ? 'xsmall' : 'small');
  return /*#__PURE__*/_react["default"].createElement(_StyledStepper.StyledIndicator, _extends({
    effectiveState: effectiveState,
    isSubStep: isSubStep,
    isClickable: isClickable
  }, passThemeFlag, rest), renderIcon((_stateTheme2 = stateTheme) == null ? void 0 : _stateTheme2.icon, {
    size: iconSize
  }));
};