// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { resolveStepTheme } from './utils';

export const StepperDescription = ({ ...rest }) => {
  const { direction, currentStep } = useStepper();
  const { theme } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step || !step.description) return null;

  const stepTheme = resolveStepTheme(
    theme,
    direction,
    step,
    isSubStep,
    currentStep,
  );

  return (
    <Text
      truncate={direction === 'horizontal'}
      {...stepTheme.description}
      {...rest}
    >
      {step.description}
    </Text>
  );
};
