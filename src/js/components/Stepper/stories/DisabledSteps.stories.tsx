import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Disabled Steps',
  component: Stepper,
} as Meta<typeof Stepper>;

export const DisabledSteps: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('account');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' as const },
    { id: 'billing', title: 'Billing', status: 'pending' as const },
    {
      id: 'confirm',
      title: 'Confirm',
      status: 'disabled' as const,
      disabledReason: 'Complete billing first.',
    },
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

DisabledSteps.storyName = 'Disabled Steps';
