import React, { useState } from 'react';

import { Box, Text, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const NestedSubSteps = () => {
  const [horizontalCurrentStep, setHorizontalCurrentStep] = useState('email');
  const [verticalCurrentStep, setVerticalCurrentStep] = useState('email');
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
          currentStep={horizontalCurrentStep}
          onStepClick={(id) => setHorizontalCurrentStep(id)}
        />
        <Text>Active: {horizontalCurrentStep}</Text>
      </Box>
      <Box pad="large" gap="medium">
        <Stepper
          steps={steps}
          currentStep={verticalCurrentStep}
          direction="vertical"
          onStepClick={(id) => setVerticalCurrentStep(id)}
        />
        <Text>Active: {verticalCurrentStep}</Text>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Nested Sub-Steps',
};

export { NestedSubSteps };
