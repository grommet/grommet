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
  const { step, errorId } = useStepItem();
  const { errorAnnouncement } = useStepper();
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  let role;
  if (errorAnnouncement === 'polite') role = 'status';
  if (errorAnnouncement === 'assertive') role = 'alert';
  return (
    <StepperHelperText role={role} variant="errorText" id={errorId} {...rest}>
      {step.errorMessage}
    </StepperHelperText>
  );
};

export const StepperDisabledReason = ({ ...rest }) => {
  const { step, reasonId } = useStepItem();
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return (
    <StepperHelperText variant="disabledReason" id={reasonId} {...rest}>
      {step.disabledReason}
    </StepperHelperText>
  );
};
