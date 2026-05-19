import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Grommet,
  Paragraph,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardProgress,
  WizardStepHeader,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/With Progress',
  component: Wizard,
} as Meta<typeof Wizard>;

export const HorizontalProgress: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'account', title: 'Account', description: 'Set up your account' },
    { id: 'billing', title: 'Billing', description: 'Add payment info' },
    { id: 'review', title: 'Review', description: 'Confirm & submit' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="xlarge" margin="auto">
        <Wizard
          steps={steps}
          showProgress="horizontal"
          onComplete={() => alert('Workflow complete!')}
        >
          <WizardProgress direction="horizontal" />
          <WizardStepHeader />
          <WizardContent>
            <Paragraph>Enter your details here.</Paragraph>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

HorizontalProgress.storyName = 'Horizontal Progress';

export const VerticalProgress: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'setup', title: 'Setup', description: 'Configure environment' },
    { id: 'deploy', title: 'Deploy', description: 'Deploy application' },
    { id: 'verify', title: 'Verify', description: 'Run checks' },
    { id: 'complete', title: 'Complete', description: 'Done!' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="xlarge" margin="auto">
        <Wizard
          steps={steps}
          showProgress="vertical"
          onComplete={() => alert('Workflow complete!')}
        >
          <WizardProgress direction="vertical" />
          <WizardStepHeader />
          <WizardContent>
            <Paragraph>Step content goes here.</Paragraph>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

VerticalProgress.storyName = 'Vertical Progress';
