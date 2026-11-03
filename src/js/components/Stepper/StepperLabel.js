// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useStepTheme } from './utils';

export const StepperLabel = ({ ...rest }) => {
  const { direction } = useStepper();
  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;

  return (
    <Text {...stepTheme.label} truncate={direction === 'horizontal'} {...rest}>
      {step.title}
    </Text>
  );
};
