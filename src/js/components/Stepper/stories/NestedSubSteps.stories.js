import React, { useState } from 'react';

import { Box, Text, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

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
        { id: 'photo', title: 'Photo', status: 'pending' },
      ],
    },
    { id: 'confirm', title: 'Confirm', status: 'pending' },
  ];
  return (
    <Grommet theme={grommet}>
      <Box pad="large" gap="medium">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="vertical"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Text>Active: {currentStep}</Text>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Nested Sub-Steps',
};

export { NestedSubSteps };
