import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Horizontal Steps',
  component: Stepper,
} as Meta<typeof Stepper>;

export const HorizontalSteps: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('account');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' as const },
    { id: 'profile', title: 'Profile', status: 'pending' as const },
    { id: 'review', title: 'Review', status: 'pending' as const },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="medium">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="horizontal"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Box pad="medium" background="background-contrast" round="small">
          <Paragraph>Step content for &ldquo;{currentStep}&rdquo;</Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

HorizontalSteps.storyName = 'Horizontal Steps';
