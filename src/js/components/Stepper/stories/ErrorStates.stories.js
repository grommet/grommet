import React, { useState } from 'react';

import { Box } from 'grommet';
import { Stepper } from '../Stepper';

const ErrorStates = () => {
  const [currentStep, setCurrentStep] = useState('billing');
  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    {
      id: 'billing',
      title: 'Billing',
      status: 'error',
      errorMessage: 'Card number is invalid.',
    },
    { id: 'review', title: 'Review', status: 'pending' },
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
    //  </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Error States',
};

export { ErrorStates };
