// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepItem, useStepper } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { deepMerge } from '../../utils/object';
import { getEffectiveState } from './StepperIndicator';

const StepperHelperText = ({ variant, ...rest }) => {
  const { currentStep, direction } = useStepper();
  const { theme } = useThemeValue();
  const { step, isSubStep } = useStepItem();
  if (!step) return null;

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

  return <Text {...stepperTheme[variant]} {...rest} />;
};

export const StepperError = ({ ...rest }) => {
  const { step } = useStepItem();
  const { errorAnnouncement } = useStepper();
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  let role;
  if (errorAnnouncement === 'polite') role = 'status';
  if (errorAnnouncement === 'assertive') role = 'alert';
  return (
    <StepperHelperText
      id={`stepper-error-${step.id}`}
      role={role}
      variant="errorText"
      {...rest}
    >
      {step.errorMessage}
    </StepperHelperText>
  );
};

export const StepperDisabledReason = ({ ...rest }) => {
  const { step } = useStepItem();
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return (
    <StepperHelperText
      id={`stepper-reason-${step.id}`}
      variant="disabledReason"
      {...rest}
    >
      {step.disabledReason}
    </StepperHelperText>
  );
};
