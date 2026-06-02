import React, { useState } from 'react';

import { Box, Text, Button, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const Interactive = () => {
  const [currentStep, setCurrentStep] = useState('step1');
  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' },
    {
      id: 'step2',
      title: 'Step 2',
      status: 'error',
      errorMessage: 'Fix the issue before proceeding.',
    },
    { id: 'step3', title: 'Step 3', status: 'pending' },
  ];
  return (
    <Grommet theme={grommet}>
      <Box pad="large" gap="medium">
        <Text>Current : {currentStep}</Text>
        <Box width="xlarge">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(id) => setCurrentStep(id)}
          />
        </Box>
        <Box direction="row" gap="small">
          {steps.map((step) => (
            <Button
              key={step.id}
              label={`Go to ${step.id}`}
              onClick={() => setCurrentStep(step.id)}
              disabled={step.status === 'disabled'}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Interactive',
};

export { Interactive };
