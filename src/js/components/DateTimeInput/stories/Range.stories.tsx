// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';

import { Box, Button, DropButton, Text } from 'grommet';
import { Calendar as CalendarIcon } from 'grommet-icons';
// @ts-ignore StyledSelect is an existing internal JavaScript module.
import { SelectOption } from '../../Select/StyledSelect';
import { DateTimeInput } from '../index';

const QUICK_RANGES = [
  { label: 'Last 1 hour', minutes: 60, value: '1h' },
  { label: 'Last 4 hours', minutes: 4 * 60, value: '4h' },
  { label: 'Last 8 hours', minutes: 8 * 60, value: '8h' },
  { label: 'Last 12 hours', minutes: 12 * 60, value: '12h' },
  { label: 'Last day', minutes: 24 * 60, value: '1d' },
  { label: 'Last 7 days', minutes: 7 * 24 * 60, value: '7d' },
  { label: 'Last 15 days', minutes: 15 * 24 * 60, value: '15d' },
  { label: 'Last 30 days', minutes: 30 * 24 * 60, value: '30d' },
  { label: 'Last 60 days', minutes: 60 * 24 * 60, value: '60d' },
  { label: 'Last 90 days', minutes: 90 * 24 * 60, value: '90d' },
];

export const Range = function RangeStory() {
  const [range, setRange] = useState({
    start: '2026-07-22T13:00:00.000Z',
    end: '2026-07-22T18:30:00.000Z',
    preset: undefined as string | undefined,
  });
  const [draftRange, setDraftRange] = useState(range);
  const [open, setOpen] = useState(false);

  const endBeforeStart = useMemo(
    () =>
      !!draftRange.start &&
      !!draftRange.end &&
      new Date(draftRange.end).getTime() < new Date(draftRange.start).getTime(),
    [draftRange],
  );

  const formatRange = () => {
    const preset = QUICK_RANGES.find(({ value }) => value === range.preset);
    if (preset) return preset.label;
    const format = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${format.format(new Date(range.start))} - ${format.format(
      new Date(range.end),
    )}`;
  };

  const selectQuickRange = (minutes: number, preset: string) => {
    const now = new Date();
    setDraftRange({
      end: now.toISOString(),
      start: new Date(now.getTime() - minutes * 60 * 1000).toISOString(),
      preset,
    });
  };

  const applyRange = () => {
    if (endBeforeStart) return;
    setRange(draftRange);
    setOpen(false);
  };

  const cancelRange = () => {
    setDraftRange(range);
    setOpen(false);
  };

  const renderDateTimePicker = (
    label: string,
    value: string,
    onChange: (nextValue: string) => void,
  ) => (
    <Box gap="small">
      <Text weight="bold">{label}</Text>
      <DateTimeInput
        id={`range-${label.toLowerCase()}`}
        format="24"
        pickerInline
        value={value}
        onChange={({ value: next }: { value?: string }) => onChange(next || '')}
        messages={{
          inputLabel: `Range ${label.toLowerCase()} date and time`,
        }}
      />
    </Box>
  );

  return (
    <Box width="large" pad="large">
      <DropButton
        open={open}
        onOpen={() => {
          setDraftRange(range);
          setOpen(true);
        }}
        onClose={cancelRange}
        dropAlign={{ top: 'bottom', left: 'left' }}
        dropContent={
          <Box direction="row" flex={false}>
            <Box
              background="background-contrast"
              border={{ side: 'right', color: 'border' }}
              gap="xsmall"
              height={{ max: 'medium' }}
              overflow="auto"
              pad="small"
              width="small"
              role="listbox"
            >
              {QUICK_RANGES.map(({ label, minutes, value }, index) => {
                const selected = draftRange.preset === value;
                return (
                  <SelectOption
                    key={value}
                    active={false}
                    aria-posinset={index + 1}
                    aria-selected={selected}
                    aria-setsize={QUICK_RANGES.length}
                    kind="option"
                    label={label}
                    role="option"
                    selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectQuickRange(minutes, value)}
                  />
                );
              })}
            </Box>
            <Box gap="medium" pad="medium">
              <Box direction="row" gap="medium" flex={false}>
                {renderDateTimePicker('Start', draftRange.start, (start) =>
                  setDraftRange({
                    ...draftRange,
                    start,
                    preset: undefined,
                  }),
                )}
                {renderDateTimePicker('End', draftRange.end, (end) =>
                  setDraftRange({
                    ...draftRange,
                    end,
                    preset: undefined,
                  }),
                )}
              </Box>
              {endBeforeStart && (
                <Text color="status-critical" size="small">
                  End date/time must be after the start date/time.
                </Text>
              )}
              <Box direction="row" gap="small" justify="end">
                <Button label="Cancel" onClick={cancelRange} />
                <Button
                  disabled={endBeforeStart}
                  label="Apply"
                  primary
                  onClick={applyRange}
                />
              </Box>
            </Box>
          </Box>
        }
      >
        <Box direction="row" align="center" gap="small" pad="small">
          <CalendarIcon />
          <Text>{formatRange()}</Text>
        </Box>
      </DropButton>
    </Box>
  );
};

export default {
  title: 'Input/DateTimeInput/Range',
};
