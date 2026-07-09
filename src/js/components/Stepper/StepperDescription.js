import React from 'react';
import { Text } from '../Text';
import { useStepper } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

export const StepperDescription = ({ stepId }) => {
  const { direction, steps } = useStepper();
  const { theme } = useThemeValue();

  const step = steps.find((s) => s.id === stepId);
  if (!step || !step.description) return null;

  const descriptionTheme = theme.stepper?.description || {};

  const size = descriptionTheme?.font?.size || 'small';
  const color = descriptionTheme?.color || 'text-weak';
  const margin = descriptionTheme?.margin || { top: 'xsmall' };

  return (
    <Text
      size={size}
      color={color}
      margin={margin}
      truncate={direction === 'horizontal'}
    >
      {step.description}
    </Text>
  );
};
