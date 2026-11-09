"use strict";

exports.__esModule = true;
exports.useStepTheme = exports.resolveStepperTheme = exports.resolveStepTheme = exports.getEffectiveState = void 0;
var _react = require("react");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StepperContext = require("./StepperContext");
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Maps step status + current position to a visual state
// used by both the indicator and label components.
var getEffectiveState = exports.getEffectiveState = function getEffectiveState(status, isCurrent) {
  if (status === 'disabled') return 'disabled';
  if (isCurrent) {
    if (status === 'completed') return 'currentCompleted';
    if (status === 'error') return 'currentError';
    return 'current';
  }
  if (status === 'completed') return 'completed';
  if (status === 'error') return 'error';
  return 'pending';
};
var resolveStepperTheme = exports.resolveStepperTheme = function resolveStepperTheme(theme, direction) {
  var _theme$stepper;
  return direction === 'horizontal' ? theme.stepper : (0, _utils.deepMerge)({}, theme.stepper, (_theme$stepper = theme.stepper) == null ? void 0 : _theme$stepper.vertical);
};
var resolveStepTheme = exports.resolveStepTheme = function resolveStepTheme(theme, direction, step, isSubStep, currentStep) {
  var _step$children, _theme$stepper2, _theme$stepper3, _theme$stepper4;
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var effectiveState = getEffectiveState(step.status, isHighlighted);
  return (0, _utils.deepMerge)({}, theme.stepper, direction === 'vertical' ? (_theme$stepper2 = theme.stepper) == null ? void 0 : _theme$stepper2.vertical : {}, isSubStep ? (_theme$stepper3 = theme.stepper) == null ? void 0 : _theme$stepper3.subStep : {}, (_theme$stepper4 = theme.stepper) == null ? void 0 : _theme$stepper4[effectiveState]);
};

// Memoized step theme resolution. deepMerge clones theme icon components
// (forwardRef components are plain objects), so without memoization every
// re-render produces a new icon element type, causing React to remount the
// indicator's svg. A remount between mousedown and mouseup detaches the
// mousedown target, which makes the browser swallow the click.
var useStepTheme = exports.useStepTheme = function useStepTheme(step, isSubStep) {
  var _useStepper = (0, _StepperContext.useStepper)(),
    currentStep = _useStepper.currentStep,
    direction = _useStepper.direction;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return (0, _react.useMemo)(function () {
    return step ? resolveStepTheme(theme, direction, step, isSubStep, currentStep) : undefined;
  }, [theme, direction, step, isSubStep, currentStep]);
};