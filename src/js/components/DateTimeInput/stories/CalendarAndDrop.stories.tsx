// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text } from 'grommet';
import { DateTimeInput } from '../index';

const ISO = '2020-07-22T18:30:00.000Z';

export const CalendarAndDrop = () => {
  const [value, setValue] = React.useState(ISO);
  const [emptyValue, setEmptyValue] = React.useState<string>();

  return (
    <Box pad="large" gap="medium" width="medium">
      <Box gap="xsmall">
        <Text size="small" weight="bold">
          Week starts Monday, weekday header, bounded to July 2020
        </Text>
        <DateTimeInput
          locale="en-US"
          value={value}
          onChange={({ value: next }: { value?: string }) =>
            setValue(next || '')
          }
          calendarProps={{
            firstDayOfWeek: 1,
            daysOfWeek: true,
            bounds: ['2020-07-01', '2020-07-31'],
          }}
        />
      </Box>
      <Box gap="xsmall">
        <Text size="small" weight="bold">
          Empty value opens on March 2030, drop aligned right without stretch
        </Text>
        <DateTimeInput
          locale="en-US"
          value={emptyValue}
          onChange={({ value: next }: { value?: string }) =>
            setEmptyValue(next)
          }
          calendarProps={{ reference: '2030-03-15' }}
          dropProps={{
            align: { top: 'bottom', right: 'right' },
            stretch: false,
          }}
        />
      </Box>
    </Box>
  );
};

CalendarAndDrop.storyName = 'Calendar and drop props';

export default {
  title: 'Input/DateTimeInput/Calendar and drop props',
};
