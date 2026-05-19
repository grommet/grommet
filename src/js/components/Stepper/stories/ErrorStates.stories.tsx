import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Error States',
  component: Stepper,
} as Meta<typeof Stepper>;

export const ErrorStates: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('billing');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' as const },
    {
      id: 'billing',
      title: 'Billing',
      status: 'error' as const,
      errorMessage: 'Card number is invalid.',
    },
    { id: 'review', title: 'Review', status: 'pending' as const },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => setCurrentStep(id)}
        />
      </Box>
    </Grommet>
  );
};

ErrorStates.storyName = 'Error States';
