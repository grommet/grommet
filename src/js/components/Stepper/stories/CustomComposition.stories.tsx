import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Grommet,
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperLabel,
  StepperStep,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Custom Composition',
  component: Stepper,
} as Meta<typeof Stepper>;

export const CustomComposition: StoryFn<typeof Stepper> = () => {
  const [currentStep, setCurrentStep] = useState('step1');
  const steps = [
    { id: 'step1', title: 'Plan', description: 'Draft the workflow' },
    { id: 'step2', title: 'Build', description: 'Implement components' },
    { id: 'step3', title: 'Verify', description: 'Run tests and review' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="medium">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(id) => setCurrentStep(id)}
        >
          {steps.map((step, index) => (
            <StepperStep key={step.id} stepId={step.id} index={index}>
              <Box direction="row" gap="small" align="center">
                <StepperIndicator />
                <Box>
                  <StepperLabel />
                  <StepperDescription />
                </Box>
              </Box>
            </StepperStep>
          ))}
        </Stepper>
      </Box>
    </Grommet>
  );
};

CustomComposition.storyName = 'Custom Composition';
