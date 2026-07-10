import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

export const StepperDescription = ({ ...rest }) => {
  const { direction } = useStepper();
  const { theme } = useThemeValue();

  const { step } = useStepItem();
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
      {...rest}
    >
      {step.description}
    </Text>
  );
};
