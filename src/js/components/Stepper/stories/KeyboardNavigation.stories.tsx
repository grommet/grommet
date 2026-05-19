import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Paragraph, Stepper, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Stepper/Keyboard Navigation',
  component: Stepper,
} as Meta<typeof Stepper>;

export const KeyboardNavigation: StoryFn<typeof Stepper> = () => {
  const steps = [
    { id: 'account', title: 'Account', status: 'completed' as const },
    { id: 'profile', title: 'Profile', status: 'pending' as const },
    {
      id: 'confirm',
      title: 'Confirm',
      status: 'disabled' as const,
      disabledReason: 'Complete profile first.',
    },
    { id: 'review', title: 'Review', status: 'pending' as const },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" gap="medium">
        <Text size="small" color="text-weak">
          Use Tab to enter Stepper, arrow keys to move focus, Home/End to jump.
        </Text>
        <Stepper steps={steps} currentStep="profile" />
        <Paragraph margin="none">
          Disabled step remains discoverable by arrow focus but is not
          activatable.
        </Paragraph>
      </Box>
    </Grommet>
  );
};

KeyboardNavigation.storyName = 'Keyboard Navigation';
