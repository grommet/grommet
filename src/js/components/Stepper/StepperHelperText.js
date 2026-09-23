// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepItem, useStepper } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

const StepperHelperText = ({ variant, ...rest }) => {
  const { theme } = useThemeValue();

  const helperTextProps = theme.stepper?.helperText;
  const variantProps = variant
    ? theme.stepper?.[variant]?.helperText || {}
    : {};

  return <Text {...helperTextProps} {...variantProps} {...rest} />;
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
      variant="error"
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
      variant="disabled"
      {...rest}
    >
      {step.disabledReason}
    </StepperHelperText>
  );
};
