import React, { useState } from 'react';

import { Box, Heading, Paragraph, Grommet } from 'grommet';
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
      description: 'Push your application to production.',
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
        <Stepper
          steps={steps}
          currentStep={currentStep}
          direction="vertical"
          onStepClick={(id) => setCurrentStep(id)}
        />
        <Box flex>
          <Heading level={2}>
            {steps.find((s) => s.id === currentStep)?.title}
          </Heading>
          <Paragraph>
            {steps.find((s) => s.id === currentStep)?.description}
          </Paragraph>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Stepper/Vertical Steps',
};

export { VerticalSteps };
