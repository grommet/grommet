// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text } from 'grommet';
import { DateTimeRangeInput } from '../index';

export const MinMax = () => {
  const minDate = '2026-07-10T00:00:00.000Z';
  const maxDate = '2026-07-20T23:59:59.999Z';
  const [value, setValue] = React.useState<[string?, string?]>([
    '2026-07-12T09:00:00.000Z',
    '2026-07-18T17:00:00.000Z',
  ]);
  const boundsFormatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Box pad="large" width="xlarge" gap="small">
      <DateTimeRangeInput
        format="12"
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={({ value: next }) => {
          setValue(next || [undefined, undefined]);
        }}
      />
      <Text size="small">
        Allowed range: {boundsFormatter.format(new Date(minDate))} through{' '}
        {boundsFormatter.format(new Date(maxDate))} (UTC bounds; displayed in
        local time).
      </Text>
    </Box>
  );
};

export default {
  title: 'Input/DateTimeRangeInput/MinMax',
};