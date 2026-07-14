import React, { useState } from 'react';

import { Box, Heading, ThemeContext } from 'grommet';
import { Stepper } from '../Stepper';

const ThemingLightDark = () => {
  const [currentStep, setCurrentStep] = useState('step1');

  const steps = [
    { id: 'step1', title: 'Account', status: 'completed' },
    { id: 'step2', title: 'Profile', status: 'pending' },
    { id: 'step3', title: 'Review', status: 'pending' },
  ];
  return (
    <Box gap="large">
      <Box pad="large" background="background-front">
        <Heading level={3}>Light Theme</Heading>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => setCurrentStep(id)}
        />
      </Box>
      <ThemeContext.Extend value={{ dark: true }}>
        <Box pad="large" background="background-front">
          <Heading level={3}>Dark Theme</Heading>
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(id) => setCurrentStep(id)}
          />
        </Box>
      </ThemeContext.Extend>
    </Box>
  );
};

export default {
  title: 'Visualizations/Stepper/Theming Light Dark',
};

export { ThemingLightDark };
