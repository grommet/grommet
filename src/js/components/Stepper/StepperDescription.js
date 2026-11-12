// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';

export const StepperDescription = ({ ...rest }) => {
  const { direction } = useStepper();

  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step || !step.description) return null;

  return (
    <Text
      id={`stepper-description-${step.id}`}
      truncate={direction === 'horizontal'}
      {...stepTheme.description}
      {...rest}
    >
      {step.description}
    </Text>
  );
};
