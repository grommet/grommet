import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Heading, Stepper } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/State Matrix',
  component: Stepper,
} as Meta<typeof Stepper>;

export const StateMatrix: StoryFn<typeof Stepper> = () => {
  const rows = [
    {
      title: 'Pending + Current',
      steps: [{ id: 's1', title: 'Pending', status: 'pending' as const }],
      currentStep: 's1',
    },
    {
      title: 'Completed + Current',
      steps: [{ id: 's1', title: 'Completed', status: 'completed' as const }],
      currentStep: 's1',
    },
    {
      title: 'Error + Current',
      steps: [
        {
          id: 's1',
          title: 'Error',
          status: 'error' as const,
          errorMessage: 'Fix validation issue.',
        },
      ],
      currentStep: 's1',
    },
    {
      title: 'Disabled',
      steps: [
        {
          id: 's1',
          title: 'Disabled',
          status: 'disabled' as const,
          disabledReason: 'Prerequisite required.',
        },
      ],
      currentStep: 'missing',
    },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="medium">
        {rows.map((row) => (
          <Box key={row.title} gap="xsmall">
            <Heading level={4} margin="none">
              {row.title}
            </Heading>
            <Stepper
              steps={row.steps}
              currentStep={row.currentStep}
              direction="horizontal"
            />
          </Box>
        ))}
      </Box>
    </Grommet>
  );
};

StateMatrix.storyName = 'State Matrix';
