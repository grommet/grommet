// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { deepMerge } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper } from './StepperContext';

// Maps step status + current position to a visual state
// used by both the indicator and label components.
export var getEffectiveState = function getEffectiveState(status, isCurrent) {
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
export var resolveStepperTheme = function resolveStepperTheme(theme, direction) {
  var _theme$stepper;
  return direction === 'horizontal' ? theme.stepper : deepMerge({}, theme.stepper, (_theme$stepper = theme.stepper) == null ? void 0 : _theme$stepper.vertical);
};
export var resolveStepTheme = function resolveStepTheme(theme, direction, step, isSubStep, currentStep) {
  var _step$children, _theme$stepper2, _theme$stepper3, _theme$stepper4;
  var isCurrent = currentStep === step.id;
  var hasCurrentChild = !isSubStep && ((_step$children = step.children) == null ? void 0 : _step$children.some(function (c) {
    return c.id === currentStep;
  }));
  var isHighlighted = isCurrent || hasCurrentChild;
  var effectiveState = getEffectiveState(step.status, isHighlighted);
  return deepMerge({}, theme.stepper, direction === 'vertical' ? (_theme$stepper2 = theme.stepper) == null ? void 0 : _theme$stepper2.vertical : {}, isSubStep ? (_theme$stepper3 = theme.stepper) == null ? void 0 : _theme$stepper3.subStep : {}, (_theme$stepper4 = theme.stepper) == null ? void 0 : _theme$stepper4[effectiveState]);
};

// Memoized step theme resolution. deepMerge clones theme icon components
// (forwardRef components are plain objects), so without memoization every
// re-render produces a new icon element type, causing React to remount the
// indicator's svg. A remount between mousedown and mouseup detaches the
// mousedown target, which makes the browser swallow the click.
export var useStepTheme = function useStepTheme(step, isSubStep) {
  var _useStepper = useStepper(),
    currentStep = _useStepper.currentStep,
    direction = _useStepper.direction;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return useMemo(function () {
    return step ? resolveStepTheme(theme, direction, step, isSubStep, currentStep) : undefined;
  }, [theme, direction, step, isSubStep, currentStep]);
};