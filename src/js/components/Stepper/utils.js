// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { deepMerge } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper } from './StepperContext';

// Maps step status + current position to a visual state
// used by both the indicator and label components.
export const getEffectiveState = (status, isCurrent) => {
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

export const resolveStepperTheme = (theme, direction) =>
  direction === 'horizontal'
    ? theme.stepper
    : deepMerge({}, theme.stepper, theme.stepper?.vertical);

export const resolveStepTheme = (
  theme,
  direction,
  step,
  isSubStep,
  currentStep,
) => {
  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);

  return deepMerge(
    {},
    theme.stepper,
    direction === 'vertical' ? theme.stepper?.vertical : {},
    isSubStep ? theme.stepper?.subStep : {},
    theme.stepper?.[effectiveState],
  );
};

// Memoized step theme resolution. deepMerge clones theme icon components
// (forwardRef components are plain objects), so without memoization every
// re-render produces a new icon element type, causing React to remount the
// indicator's svg. A remount between mousedown and mouseup detaches the
// mousedown target, which makes the browser swallow the click.
export const useStepTheme = (step, isSubStep) => {
  const { currentStep, direction } = useStepper();
  const { theme } = useThemeValue();
  return useMemo(
    () =>
      step
        ? resolveStepTheme(theme, direction, step, isSubStep, currentStep)
        : undefined,
    [theme, direction, step, isSubStep, currentStep],
  );
};
