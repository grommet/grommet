import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Wizard, WizardFooter } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Uncontrolled Mode',
  component: Wizard,
} as Meta<typeof Wizard>;

export const UncontrolledMode: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps} defaultStep="step1">
          <Paragraph>Wizard owns active step state in this mode.</Paragraph>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

UncontrolledMode.storyName = 'Uncontrolled Mode';
