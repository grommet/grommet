// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { deepMerge } from '../../utils/object';
import { getEffectiveState } from './StepperIndicator';

export const StepperDescription = ({ ...rest }) => {
  const { direction, currentStep } = useStepper();
  const { theme } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step || !step.description) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);

   const stepperTheme = deepMerge(
    {},
    theme.stepper,
    direction === 'vertical' ? theme.stepper?.vertical : {},
    isSubStep ? theme.stepper?.substep : {},
    theme.stepper?.[effectiveState],
  );

  return (
    <Text
      truncate={direction === 'horizontal'}
      {...stepperTheme.description}
      {...rest}
    >
      {step.description}
    </Text>
  );
};
