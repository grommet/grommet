import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Grommet } from 'grommet';
import { Calendar } from 'grommet-icons';
import { DateTimeInput } from '../../index';

// Note: ThemeType annotation not used here because dateTimeInput is not yet in
// the published grommet package types. Type will be available post-merge.
const customTheme = {
  dateTimeInput: {
    container: {
      round: 'xsmall',
    },
    button: {
      margin: 'xsmall',
    },
    icon: {
      calendar: Calendar, // Pass the component, not JSX
    },
  },
};

const meta: Meta<typeof DateTimeInput> = {
  title: 'Input/DateTimeInput/Custom Themed',
  component: DateTimeInput,
};

export default meta;

type Story = StoryObj<typeof DateTimeInput>;

export const CustomThemed: Story = {
  render: () => {
    const [value, setValue] = React.useState('2026-07-22T18:30:00.000Z');

    return (
      <Grommet theme={customTheme}>
        <Box pad="large" width="medium" gap="small">
          <DateTimeInput
            format="12"
            value={value}
            onChange={({ value: next }: { value?: string }) => {
              setValue(next || '');
            }}
          />
        </Box>
      </Grommet>
    );
  },
};
