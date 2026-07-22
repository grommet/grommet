import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

export const StepperDescription = ({ ...rest }) => {
  const { direction } = useStepper();
  const { theme } = useThemeValue();

  const { step } = useStepItem();
  if (!step || !step.description) return null;

  const descriptionProps = theme.stepper?.description;

  return (
    <Text {...descriptionProps} truncate={direction === 'horizontal'} {...rest}>
      {step.description}
    </Text>
  );
};
