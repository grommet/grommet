import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Heading, Paragraph, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Vertical Steps',
  component: Stepper,
} as Meta<typeof Stepper>;

export const VerticalSteps: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('setup');

  const steps = [
    {
      id: 'setup',
      title: 'Setup',
      description: 'Configure your environment.',
      status: 'completed' as const,
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Push your application to production.',
      status: 'pending' as const,
    },
    {
      id: 'verify',
      title: 'Verify',
      description: 'Run post-deployment checks.',
      status: 'pending' as const,
    },
  ];

  const activeStep = steps.find((s) => s.id === currentStep);

  return (
    <Grommet theme={grommet} full>
      <Box direction="row" gap="large" pad="large">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="vertical"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Box flex>
          <Heading level={2}>{activeStep?.title}</Heading>
          <Paragraph>{activeStep?.description}</Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

VerticalSteps.storyName = 'Vertical Steps';
