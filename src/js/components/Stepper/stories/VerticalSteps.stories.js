import React, { useState } from 'react';

import { Box, Text, Heading, Paragraph, Grommet } from 'grommet';
import { Stepper } from '../Stepper';
import { grommet } from '../../../themes';

const VerticalSteps = () => {
  const [currentStep, setCurrentStep] = useState('deploy');
  const steps = [
    {
      id: 'setup',
      title: 'Setup',
      description: 'Configure your environment.',
      status: 'completed',
    },
    {
      id: 'deploy',
      title: 'Deploy',
      status: 'pending',
    },
    {
      id: 'verify',
      title: 'Verify',
      description: 'Run post-deployment checks.',
      status: 'pending',
    },
  ];
  return (
    <Grommet theme={grommet}>
      <Box direction="row" gap="large" pad="medium">
        <Box height="small">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            direction="vertical"
            onStepClick={(id) => setCurrentStep(id)}
          />
        </Box>
        <Box
          pad="medium"
          background="background-contrast"
          round="small"
          width="xxlarge"
          height="large"
          gap="none"
        >
          <Heading level={2}>
            {steps.find((s) => s.id === currentStep)?.title}
          </Heading>
          <Text color="text-strong">
            {steps.find((s) => s.id === currentStep)?.description}
          </Text>
          <Paragraph>Step content</Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Vertical Steps',
};

export { VerticalSteps };
