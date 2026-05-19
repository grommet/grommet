import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Grommet,
  Paragraph,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardStepHeader,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Basic Linear',
  component: Wizard,
} as Meta<typeof Wizard>;

export const BasicLinear: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'account', title: 'Account Details' },
    { id: 'shipping', title: 'Shipping Address' },
    { id: 'review', title: 'Review & Submit' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard
          steps={steps}
          onComplete={(data) =>
            alert(`Complete! ${JSON.stringify(data.completedSteps)}`)
          }
        >
          <WizardStepHeader />
          <WizardContent>
            <Paragraph>Follow the prompts for this step.</Paragraph>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

BasicLinear.storyName = 'Basic Linear';
