import React from 'react';

import { Text } from '../Text';
import { useStepItem } from './StepperContext';

const StepperDescription = () => {
  const { step } = useStepItem();

  if (!step || !step.description) return null;

  return (
    <Text size="xsmall" color="text-weak" textAlign="center">
      {step.description}
    </Text>
  );
};

StepperDescription.displayName = 'StepperDescription';

export { StepperDescription };
