// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef, useState } from 'react';

import { Box, Button, Drop, Text, ToggleGroup } from 'grommet';
import { Calendar as CalendarIcon } from 'grommet-icons';
import { DateTimeInput } from '../index';

const PRESET_OPTIONS = [
  { label: '1H', value: '1h', minutes: 60 },
  { label: '8H', value: '8h', minutes: 8 * 60 },
  { label: '1D', value: '1d', minutes: 24 * 60 },
  { label: '1W', value: '1w', minutes: 7 * 24 * 60 },
  { label: '1M', value: '1m', minutes: 30 * 24 * 60 },
  { label: '3M', value: '3m', minutes: 90 * 24 * 60 },
];

export const RangeToggle = function RangeToggleStory() {
  const now = new Date();
  const [range, setRange] = useState({
    start: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    end: now.toISOString(),
    preset: '8h' as string | undefined,
  });
  const [draftRange, setDraftRange] = useState(range);
  const [customOpen, setCustomOpen] = useState(false);
  const calendarButtonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const endBeforeStart = useMemo(
    () =>
      !!draftRange.start &&
      !!draftRange.end &&
      new Date(draftRange.end).getTime() < new Date(draftRange.start).getTime(),
    [draftRange],
  );

  const selectPreset = (value: string) => {
    const preset = PRESET_OPTIONS.find((p) => p.value === value);
    if (!preset) return;
    const next = new Date();
    setRange({
      start: new Date(
        next.getTime() - preset.minutes * 60 * 1000,
      ).toISOString(),
      end: next.toISOString(),
      preset: value,
    });
  };

  const formatRange = () => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${fmt.format(new Date(range.start))} – ${fmt.format(
      new Date(range.end),
    )}`;
  };

  const closeCustom = () => {
    setDraftRange(range);
    setCustomOpen(false);
  };

  return (
    <Box pad="large" gap="small">
      <Box direction="row" align="center">
        <ToggleGroup
          options={PRESET_OPTIONS.map(({ label, value }) => ({
            label,
            value,
          }))}
          value={range.preset}
          onToggle={({ value }) => {
            if (typeof value === 'string') selectPreset(value);
          }}
        />
        <Button
          ref={calendarButtonRef}
          icon={<CalendarIcon />}
          tip="Custom range"
          onClick={() => {
            setDraftRange(range);
            setCustomOpen(true);
          }}
        />
      </Box>
      <Text size="small">{formatRange()}</Text>
      {customOpen && (
        <Drop
          target={calendarButtonRef.current ?? undefined}
          align={{ top: 'bottom', right: 'right' }}
          onClickOutside={closeCustom}
          onEsc={closeCustom}
        >
          <Box pad="medium" gap="medium">
            <Box direction="row" gap="medium">
              <Box gap="small">
                <Text weight="bold">Start</Text>
                <DateTimeInput
                  id="toggle-range-start"
                  format="24"
                  inline="all"
                  value={draftRange.start}
                  onChange={({ value: next }: { value?: string }) =>
                    setDraftRange({
                      ...draftRange,
                      start: next || '',
                      preset: undefined,
                    })
                  }
                />
              </Box>
              <Box gap="small">
                <Text weight="bold">End</Text>
                <DateTimeInput
                  id="toggle-range-end"
                  format="24"
                  inline="all"
                  value={draftRange.end}
                  onChange={({ value: next }: { value?: string }) =>
                    setDraftRange({
                      ...draftRange,
                      end: next || '',
                      preset: undefined,
                    })
                  }
                />
              </Box>
            </Box>
            {endBeforeStart && (
              <Text color="status-critical" size="small">
                End date/time must be after the start date/time.
              </Text>
            )}
            <Box direction="row" gap="small" justify="end">
              <Button label="Cancel" onClick={closeCustom} />
              <Button
                label="Apply"
                primary
                disabled={endBeforeStart}
                onClick={() => {
                  setRange({ ...draftRange, preset: undefined });
                  setCustomOpen(false);
                }}
              />
            </Box>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export default {
  title: 'Input/DateTimeInput/RangeToggle',
};
