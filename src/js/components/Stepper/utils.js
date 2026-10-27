// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

import { deepMerge } from '../../utils';


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
    isSubStep ? theme.stepper?.substep : {},
    theme.stepper?.[effectiveState],
  );
};
