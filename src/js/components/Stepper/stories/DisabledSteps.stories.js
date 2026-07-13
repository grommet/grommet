import React, { useState } from 'react';

import { Box } from 'grommet';
import { Stepper } from '../Stepper';

const DisabledSteps = () => {
  const [currentStep, setCurrentStep] = useState('billing');
  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'billing', title: 'Billing', status: 'pending' },
    {
      id: 'confirm',
      title: 'Confirm',
      status: 'disabled',
      disabledReason: 'Complete billing first.',
    },
  ];
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(id) => setCurrentStep(id)}
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Disabled Steps',
};

export { DisabledSteps };
