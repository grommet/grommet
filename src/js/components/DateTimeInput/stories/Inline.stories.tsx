// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text } from 'grommet';
import { DateTimeInput } from '../index';

export const Inline = () => {
  const [value, setValue] = React.useState('2026-07-22T18:30:00.000Z');
  const localValue = value
    ? new Date(value).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      })
    : 'none';

  return (
    <Box align="center" pad="large" gap="small">
      <DateTimeInput
        id="inline-date-time"
        inline
        value={value}
        onChange={({ value: next }: { value?: string }) => {
          setValue(next || '');
        }}
      />
    </Box>
  );
};

export default {
  title: 'Input/DateTimeInput/Inline',
};
