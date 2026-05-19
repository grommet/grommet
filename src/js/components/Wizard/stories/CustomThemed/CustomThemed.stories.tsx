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

export default {
  title: 'Controls/Wizard/Custom Themed',
  component: Wizard,
} as Meta<typeof Wizard>;

const customTheme = {
  wizard: {
    container: {
      background: 'light-1',
      gap: 'small',
    },
    header: {
      background: 'light-2',
    },
    progress: {
      margin: { bottom: 'small' },
    },
    stepHeader: {
      counter: {
        color: 'dark-4',
      },
      description: {
        color: 'dark-5',
      },
    },
    content: {
      pad: 'small',
      minHeight: '160px',
    },
    footer: {
      background: 'light-2',
      gap: 'xsmall',
    },
  },
};

export const CustomThemed: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'account', title: 'Account', description: 'Setup account details' },
    { id: 'billing', title: 'Billing', description: 'Configure payments' },
    { id: 'review', title: 'Review', description: 'Confirm and submit' },
  ];

  return (
    <Grommet theme={customTheme} full>
      <Box pad="large" width="xlarge" margin="auto">
        <Wizard steps={steps} showProgress="horizontal">
          <WizardProgress direction="horizontal" />
          <WizardStepHeader />
          <WizardContent>
            <Paragraph>This story verifies Wizard token overrides.</Paragraph>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

CustomThemed.storyName = 'Custom Themed';
