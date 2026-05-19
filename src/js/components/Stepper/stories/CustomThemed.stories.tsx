import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Stepper } from 'grommet';

export default {
  title: 'Controls/Stepper/Custom Themed',
  component: Stepper,
} as Meta<typeof Stepper>;

const customTheme = {
  stepper: {
    step: {
      colors: {
        current: {
          background: 'accent-2',
          text: 'white',
          border: 'accent-2',
        },
        completed: {
          background: 'accent-1',
          text: 'white',
          border: 'accent-1',
        },
      },
    },
    connector: {
      color: {
        completed: 'accent-1',
      },
    },
  },
};

export const CustomThemed: StoryFn<typeof Stepper> = () => {
  const steps = [
    { id: 'step1', title: 'Account', status: 'completed' as const },
    { id: 'step2', title: 'Profile', status: 'pending' as const },
    { id: 'step3', title: 'Review', status: 'pending' as const },
  ];

  return (
    <Grommet theme={customTheme} full>
      <Box pad="large">
        <Stepper steps={steps} currentStep="step2" />
      </Box>
    </Grommet>
  );
};

CustomThemed.storyName = 'Custom Themed';
