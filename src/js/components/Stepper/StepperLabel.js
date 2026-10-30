// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { resolveStepTheme } from './utils';

export const StepperLabel = ({ ...rest }) => {
  const { currentStep, direction } = useStepper();
  const { theme } = useThemeValue();
  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const stepTheme = resolveStepTheme(
    theme,
    direction,
    step,
    isSubStep,
    currentStep,
  );
  return (
    <Text
      {...stepTheme.label}
      truncate={direction === 'horizontal'}
      {...rest}
    >
      {step.title}
    </Text>
  );
};
