// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text, ThemeContext } from 'grommet';
import { DateTimeInput } from '../index';

const ISO = '2020-07-22T18:30:00.000Z';

// Same compact theme as grommet-x's Storybook preview.
const compactTheme = {
  calendar: {
    medium: { fontSize: '14px', daySize: '36px' },
    // Calendar width comes from global.size, so set it to 7 x daySize to
    // keep the days from spreading apart.
    extend: ({ fillContainer }: { fillContainer?: boolean }) =>
      fillContainer ? '' : 'width: 252px;',
  },
  timeInput: {
    drop: {
      column: { gap: 'none', pad: { horizontal: 'none' } },
      option: {
        container: { pad: { vertical: 'xxsmall', horizontal: 'xxsmall' } },
      },
    },
  },
};

export const CustomDaySize = () => {
  const [value, setValue] = React.useState(ISO);

  return (
    <ThemeContext.Extend value={compactTheme}>
      <Box pad="large" gap="medium" align="start">
        <Box gap="xsmall" width="medium">
          <Text size="small" weight="bold">
            Compact calendar (36px days) and time columns
          </Text>
          <DateTimeInput
            locale="en-US"
            value={value}
            onChange={({ value: next }: { value?: string }) =>
              setValue(next || '')
            }
            calendarProps={{ daysOfWeek: true }}
          />
        </Box>
        <DateTimeInput
          inline
          locale="en-US"
          value={value}
          onChange={({ value: next }: { value?: string }) =>
            setValue(next || '')
          }
          calendarProps={{ daysOfWeek: true }}
        />
      </Box>
    </ThemeContext.Extend>
  );
};

CustomDaySize.storyName = 'Custom day size';

export default {
  title: 'Input/DateTimeInput/Custom day size',
};
