import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from 'grommet';
import { DateTimeInput } from '../DateTimeInput';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Input/DateTimeInput/Simple',
  component: DateTimeInput,
};

export default meta;

type Story = StoryObj<typeof DateTimeInput>;

export const Simple: Story = {
  render: () => {
    const [value, setValue] = React.useState('2026-07-22T18:30:00.000Z');

    return (
      <Box pad="large" width="medium" gap="small">
        <DateTimeInput
          format="12"
          value={value}
          onChange={({ value: next }: { value?: string }) => {
            setValue(next || '');
          }}
        />
      </Box>
    );
  },
};
