import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Stepper, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Responsive Fallback',
  component: Stepper,
} as Meta<typeof Stepper>;

export const ResponsiveFallback: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('configure');
  const steps = [
    {
      id: 'configure',
      title: 'Configure Environment Settings',
      status: 'completed' as const,
    },
    {
      id: 'permissions',
      title: 'Review Team Access Permissions',
      status: 'pending' as const,
    },
    {
      id: 'deployment',
      title: 'Finalize Deployment Preferences',
      status: 'pending' as const,
    },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="small" width="small">
        <Text size="small" color="text-weak">
          In constrained width, focus/tap reveals full active step label inline.
        </Text>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="horizontal"
          onStepClick={(id) => setCurrentStep(id)}
        />
      </Box>
    </Grommet>
  );
};

ResponsiveFallback.storyName = 'Responsive Fallback';
