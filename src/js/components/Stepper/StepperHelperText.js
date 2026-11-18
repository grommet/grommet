// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import { Text } from '../Text';
import { useStepItem, useStepper, useStepperHelperRef } from './StepperContext';
import { useStepTheme } from './utils';

const StepperHelperText = forwardRef(({ variant, ...rest }, ref) => {
  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;

  return <Text ref={ref} {...stepTheme[variant]} {...rest} />;
});

StepperHelperText.displayName = 'StepperHelperText';

export const StepperError = forwardRef(({ ...rest }, forwardedRef) => {
  const { step, errorId } = useStepItem();
  const { errorAnnouncement } = useStepper();
  const ref = useStepperHelperRef(
    'error',
    'id' in rest ? rest.id : errorId,
    forwardedRef,
  );
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  let role;
  if (errorAnnouncement === 'polite') role = 'status';
  if (errorAnnouncement === 'assertive') role = 'alert';
  return (
    <StepperHelperText
      ref={ref}
      role={role}
      variant="errorText"
      id={errorId}
      {...rest}
    >
      {step.errorMessage}
    </StepperHelperText>
  );
});

StepperError.displayName = 'StepperError';

export const StepperDisabledReason = forwardRef(({ ...rest }, forwardedRef) => {
  const { step, reasonId } = useStepItem();
  const ref = useStepperHelperRef(
    'reason',
    'id' in rest ? rest.id : reasonId,
    forwardedRef,
  );
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return (
    <StepperHelperText
      ref={ref}
      variant="disabledReason"
      id={reasonId}
      {...rest}
    >
      {step.disabledReason}
    </StepperHelperText>
  );
});

StepperDisabledReason.displayName = 'StepperDisabledReason';
