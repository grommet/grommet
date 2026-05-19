import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Wizard, WizardFooter } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Skippable Step',
  component: Wizard,
} as Meta<typeof Wizard>;

export const SkippableStep: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'required', title: 'Required' },
    { id: 'optional', title: 'Optional Details', skippable: true },
    { id: 'confirm', title: 'Confirm' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps} defaultStep="optional">
          <Paragraph>This step can be skipped with the Skip action.</Paragraph>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

SkippableStep.storyName = 'Skippable Step';
