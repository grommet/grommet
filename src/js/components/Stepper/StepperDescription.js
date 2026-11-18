// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';

export const StepperDescription = ({ ...rest }) => {
  const { direction, showDescription } = useStepper();

  const { step, isSubStep, descriptionId } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step || !step.description || !showDescription) return null;

  return (
    <Text
      truncate={direction === 'horizontal'}
      {...stepTheme.description}
      id={descriptionId}
      {...rest}
    >
      {step.description}
    </Text>
  );
};
