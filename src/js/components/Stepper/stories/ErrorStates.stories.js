import React, { useState } from 'react';

import { Box, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

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
    <Grommet theme={grommet}>
      <Box pad="large">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => setCurrentStep(id)}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Error States',
};

export { ErrorStates };
