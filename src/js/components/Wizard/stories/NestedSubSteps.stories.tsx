import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Grommet,
  Paragraph,
  Text,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardProgress,
  WizardStepHeader,
  useWizard,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Nested Sub-Steps',
  component: Wizard,
} as Meta<typeof Wizard>;

const NestedStepDetails = () => {
  const { currentStep, linearSteps = [] } = useWizard();
  const activeStep = linearSteps.find((step) => step.id === currentStep);

  return (
    <Box gap="small">
      <Text weight="bold">Current Step ID: {currentStep}</Text>
      <Paragraph margin={{ top: 'none' }}>
        Parent and child steps are traversed in child-first order.
      </Paragraph>
      {activeStep?.description && (
        <Paragraph margin={{ top: 'none' }}>{activeStep.description}</Paragraph>
      )}
    </Box>
  );
};

export const NestedSubSteps: StoryFn<typeof Wizard> = () => {
  const steps = [
    {
      id: 'account',
      title: 'Account Setup',
      description: 'Create your account details.',
      children: [
        {
          id: 'profile',
          title: 'Profile',
          description: 'Add personal information.',
        },
        {
          id: 'security',
          title: 'Security',
          description: 'Configure password and recovery.',
        },
      ],
    },
    {
      id: 'billing',
      title: 'Billing Setup',
      description: 'Prepare billing configuration.',
      children: [
        {
          id: 'payment',
          title: 'Payment Method',
          description: 'Add your preferred payment method.',
        },
        {
          id: 'tax',
          title: 'Tax Details',
          description: 'Provide tax settings.',
          skippable: true,
        },
      ],
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Confirm and finish setup.',
    },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="xlarge" margin="auto">
        <Wizard steps={steps} showProgress="horizontal">
          <WizardProgress direction="vertical" />
          <WizardStepHeader />
          <WizardContent>
            <NestedStepDetails />
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

NestedSubSteps.storyName = 'Nested Sub-Steps';
