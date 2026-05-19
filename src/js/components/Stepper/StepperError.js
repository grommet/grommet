import React from 'react';

import { Text } from '../Text';
import { useStepItem } from './StepperContext';

// Renders inline error message for a step in error state.
// The element ID matches the aria-describedby reference on the step button.
const StepperError = () => {
  const { step } = useStepItem();

  if (!step || step.status !== 'error' || !step.errorMessage) return null;

  return (
    <Text
      id={`stepper-error-${step.id}`}
      size="xsmall"
      color="status-error"
      textAlign="center"
      margin={{ top: 'xxsmall' }}
    >
      {step.errorMessage}
    </Text>
  );
};

StepperError.displayName = 'StepperError';

export { StepperError };
