// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';
import { StyledStepLabel } from './StyledStepper';

export const StepperLabel = ({ ...rest }) => {
  const { clickableSteps, direction } = useStepper();
  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;

  const isDisabled = step.status === 'disabled';
  const isClickable = clickableSteps && !isDisabled;

  return (
    <StyledStepLabel
      {...stepTheme.label}
      truncate={direction === 'horizontal'}
      stepTheme={stepTheme}
      isClickable={isClickable}
      {...rest}
    >
      {step.title}
    </StyledStepLabel>
  );
};
