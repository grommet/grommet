import React, { useState } from 'react';

import { Box, Paragraph, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const HorizontalSteps = () => {
  const [currentStep, setCurrentStep] = useState('profile');
  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'profile', title: 'Profile', status: 'pending' },
    { id: 'review', title: 'Review', status: 'pending' },
  ];
  return (
    <Grommet theme={grommet}>
      <Box gap="medium" pad="large">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="horizontal"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Box pad="medium" background="background-contrast" round="small">
          <Paragraph>Step content for &quot;{currentStep}&quot;</Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Horizontal Steps',
};

export { HorizontalSteps };
