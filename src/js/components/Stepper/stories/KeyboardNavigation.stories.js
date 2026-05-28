import React, { useState } from 'react';

import { Box, Text, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const KeyboardNavigation = () => {
  const [currentStep, setCurrentStep] = useState('step2');
  const [lastAction, setLastAction] = useState('');
  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' },
    { id: 'step2', title: 'Step 2', status: 'pending' },
    { id: 'step3', title: 'Step 3', status: 'pending' },
    {
      id: 'step4',
      title: 'Step 4',
      status: 'disabled',
      disabledReason: 'Complete all prior steps.',
    },
    { id: 'step5', title: 'Step 5', status: 'pending' },
  ];
  return (
    <Grommet theme={grommet}>
      <Box pad="large" gap="medium">
        <Text weight="bold">
          Tab into the stepper, then use Arrow keys, Home, End, Enter/Space.
        </Text>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => {
            setCurrentStep(id);
            setLastAction(`Clicked: ${id}`);
          }}
        />
        <Text>Current: {currentStep}</Text>
        {lastAction && <Text>Last action: {lastAction}</Text>}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Keyboard Navigation',
};

export { KeyboardNavigation };
