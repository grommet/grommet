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
    <Box pad="large" gap="small" width="large">
      <DateTimeInput
        id="inline-date-time"
        inline
        value={value}
        onChange={({ value: next }: { value?: string }) => {
          setValue(next || '');
        }}
      />
      <Text size="small" truncate>
        Local display: {localValue}
      </Text>
      <Text size="small" truncate>
        UTC ISO value: {value || 'none'}
      </Text>
    </Box>
  );
};

export default {
  title: 'Input/DateTimeInput/Inline',
};
