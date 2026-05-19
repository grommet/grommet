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
  type StepDefinition,
} from 'grommet';

const customTheme = {
  wizard: {
    container: {
      background: 'background-back',
      // gap: undefined,
    },
    header: {
      background: 'background-front',
      pad: { horizontal: 'medium', vertical: 'small' },
    },
  },
};

const steps: StepDefinition[] = [
  { id: 'subscriptions', title: 'Add subscriptions' },
  { id: 'devices', title: 'Add devices' },
  { id: 'recommendations', title: 'Recommended actions' },
  { id: 'review', title: 'Wrap up' },
];

export const GuideMe: StoryFn<typeof Wizard> = () => {
  const onStepChange = (event) => {
    console.log(event);
  };

  return (
    <Grommet full theme={customTheme}>
      <Box pad="large" width="large" margin="auto">
        <Wizard
          steps={steps}
          onStepChange={onStepChange}
          onComplete={(data) =>
            alert(`Complete! ${JSON.stringify(data.completedSteps)}`)
          }
          showProgress="vertical"
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Controls/Wizard/Guide Me',
  component: Wizard,
} as Meta<typeof Wizard>;

GuideMe.storyName = 'Guide Me';
