// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Grommet } from 'grommet';
import { Calendar } from 'grommet-icons';
import { DateTimeRangeInput } from '../../index';

const customTheme = {
  dateTimeRangeInput: {
    button: {
      margin: 'xsmall',
    },
    container: {
      minWidth: '560px',
      round: 'xsmall',
    },
    field: {
      width: '240px',
    },
    footer: {
      actions: {
        gap: 'xsmall',
      },
      border: {
        color: 'brand',
        size: 'small',
      },
      pad: 'small',
    },
    icon: {
      calendar: Calendar,
    },
    responsiveBreakpoint: 'medium',
  },
};

const meta: Meta<typeof DateTimeRangeInput> = {
  title: 'Input/DateTimeRangeInput/Custom Themed',
  component: DateTimeRangeInput,
};

export default meta;

type Story = StoryObj<typeof DateTimeRangeInput>;

export const CustomThemed: Story = {
  render: () => {
    const [value, setValue] = React.useState<[string?, string?]>([
      '2026-07-22T09:00:00.000Z',
      '2026-07-22T18:30:00.000Z',
    ]);

    return (
      <Grommet theme={customTheme}>
        <Box pad="large" width="xlarge" gap="small">
          <DateTimeRangeInput
            format="12"
            value={value}
            onChange={({ value: next }: { value?: [string?, string?] }) => {
              setValue(next || [undefined, undefined]);
            }}
          />
        </Box>
      </Grommet>
    );
  },
};
