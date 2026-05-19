import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Read-Only',
  component: Stepper,
} as Meta<typeof Stepper>;

export const ReadOnly: StoryFn<typeof Stepper> = () => {
  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' as const },
    { id: 'step2', title: 'Step 2', status: 'completed' as const },
    { id: 'step3', title: 'Step 3', status: 'pending' as const },
    { id: 'step4', title: 'Step 4', status: 'pending' as const },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large">
        <Stepper steps={steps} currentStep="step3" clickableSteps={false} />
      </Box>
    </Grommet>
  );
};

ReadOnly.storyName = 'Read-Only';
