import React, { useEffect, useRef, useState } from 'react';

import { Box, Text, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const KeyboardNavigation = () => {
  const [currentStep, setCurrentStep] = useState('step1');
  const stepperRef = useRef();
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

  useEffect(() => {
    // Auto-focus the first step button so the focus ring is visible immediately
    const firstButton = stepperRef.current?.querySelector(
      '[data-stepper-step]',
    );
    if (firstButton) firstButton.focus();
  }, []);

  return (
    <Grommet theme={grommet}>
      <Box pad="large" gap="medium">
        <Text weight="bold">
          Use Arrow keys to navigate and Enter/Space to select.
        </Text>
        <Stepper
          ref={stepperRef}
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => {
            setCurrentStep(id);
          }}
        />
        <Text>Selected : {currentStep}</Text>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Keyboard Navigation',
};

export { KeyboardNavigation };
