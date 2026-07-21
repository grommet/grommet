import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { Stepper } from '../Stepper';

const NestedSubSteps = () => {
  const [currentStep, setCurrentStep] = useState('email');
  const steps = [
    {
      id: 'account',
      title: 'Account Setup',
      children: [
        { id: 'email', title: 'Email', status: 'completed' },
        {
          id: 'password',
          title: 'Password',
          status: 'pending',
        },
      ],
    },
    {
      id: 'profile',
      title: 'Profile Setup',
      children: [
        { id: 'name', title: 'Name', status: 'pending' },
        {
          id: 'photo',
          title: 'Photo',
          status: 'error',
          errorMessage: 'Please upload a valid photo.',
        },
      ],
    },
    { id: 'confirm', title: 'Confirm', status: 'pending' },
  ];
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large" gap="medium">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        direction="vertical"
        aria-label="Account setup progress"
        onStepClick={(id) => setCurrentStep(id)}
      />
      <Text>
        Parent:{' '}
        {steps.find((s) => s.children?.some((c) => c.id === currentStep))
          ?.title || 'None'}
      </Text>
      <Text>Current Step: {currentStep}</Text>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Nested Sub-Steps',
};

export { NestedSubSteps };
