// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Text } from 'grommet';
import { DateTimeRangeInput } from '../index';

const timestampFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const presetOptions: Array<{
  id: string;
  label: string;
  minutes: number;
}> = [
  {
    id: 'last-1-hour',
    label: 'Last 1 Hour',
    minutes: 60,
  },
  {
    id: 'last-8-hours',
    label: 'Last 8 Hours',
    minutes: 8 * 60,
  },
  {
    id: 'last-1-day',
    label: 'Last 1 Day',
    minutes: 24 * 60,
  },
  {
    id: 'last-1-week',
    label: 'Last 1 Week',
    minutes: 7 * 24 * 60,
  },
  {
    id: 'last-1-month',
    label: 'Last 1 Month',
    minutes: 30 * 24 * 60,
  },
  {
    id: 'last-3-months',
    label: 'Last 3 Months',
    minutes: 90 * 24 * 60,
  },
];

const ranges = presetOptions.map(({ id, label, minutes }) => ({
  id,
  label,
  getValue: (): [string, string] => {
    const end = new Date();
    const start = new Date(end.getTime() - minutes * 60 * 1000);
    return [start.toISOString(), end.toISOString()];
  },
}));

export const Simple = () => {
  const [value, setValue] = React.useState<[string?, string?]>([
    undefined,
    undefined,
  ]);
  const onChange = ({ value: next }: { value?: [string?, string?] }) => {
    setValue(next || [undefined, undefined]);
  };
  const timestamp =
    value[0] && value[1]
      ? `${timestampFormatter.format(
          new Date(value[0]),
        )} – ${timestampFormatter.format(new Date(value[1]))}`
      : undefined;

  return (
    <Box pad="large" width="xlarge" gap="small">
      <DateTimeRangeInput
        format="12"
        ranges={ranges}
        value={value}
        onChange={onChange}
      />
      {timestamp && <Text size="small">{timestamp}</Text>}
    </Box>
  );
};

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
  title: 'Input/DateTimeRangeInput/Simple',
};
