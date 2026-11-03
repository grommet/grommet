// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepItem, useStepper } from './StepperContext';
import { useStepTheme } from './utils';

const StepperHelperText = ({ variant, ...rest }) => {
  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;

  return <Text {...stepTheme[variant]} {...rest} />;
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
