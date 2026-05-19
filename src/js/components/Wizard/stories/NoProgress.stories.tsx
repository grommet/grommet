import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Wizard } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/No Progress',
  component: Wizard,
} as Meta<typeof Wizard>;

export const NoProgress: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps} showProgress={false}>
          <Paragraph>
            Progress is intentionally hidden in this layout.
          </Paragraph>
        </Wizard>
      </Box>
    </Grommet>
  );
};

NoProgress.storyName = 'No Progress';
