import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Wizard, WizardFooter } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Controlled Mode',
  component: Wizard,
} as Meta<typeof Wizard>;

export const ControlledMode: StoryFn<typeof Wizard> = () => {
  const [currentStep, setCurrentStep] = useState('step1');
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
    { id: 'step3', title: 'Step 3' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard
          steps={steps}
          currentStep={currentStep}
          onStepChange={(event) => {
            if (event.phase === 'completed' && event.toStepId) {
              setCurrentStep(event.toStepId);
            }
          }}
        >
          <Paragraph>{`Current step from parent state: ${currentStep}`}</Paragraph>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

ControlledMode.storyName = 'Controlled Mode';
