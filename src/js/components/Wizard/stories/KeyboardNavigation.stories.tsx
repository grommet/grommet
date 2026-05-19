import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Grommet,
  Paragraph,
  Text,
  Wizard,
  WizardFooter,
  WizardProgress,
  WizardStepHeader,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Keyboard Navigation',
  component: Wizard,
} as Meta<typeof Wizard>;

export const KeyboardNavigation: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'step1', title: 'Account' },
    { id: 'step2', title: 'Billing' },
    { id: 'step3', title: 'Review' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="xlarge" margin="auto" gap="small">
        <Text size="small" color="text-weak">
          Use Tab to move focus, Enter/Space to activate buttons, and arrow keys
          while on Stepper controls.
        </Text>
        <Wizard steps={steps} showProgress="horizontal">
          <WizardProgress direction="horizontal" />
          <WizardStepHeader />
          <Paragraph>
            Try navigating this workflow with keyboard only.
          </Paragraph>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

KeyboardNavigation.storyName = 'Keyboard Navigation';
