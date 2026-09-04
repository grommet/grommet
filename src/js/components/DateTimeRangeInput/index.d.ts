// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface DateTimeRange {
  id: string;
  label: React.ReactNode;
  getValue: () => [string, string];
}

export interface DateTimeRangeInputProps {
  defaultValue?: [string?, string?];
  disabled?: boolean;
  focusIndicator?: boolean;
  format?: '12' | '24';
  id?: string;
  locale?: string;
  messages?: {
    activeSection?: string;
    activeSectionValue?: string;
    chooseDateTime?: string;
    chooseDateTimeRange?: string;
    cancel?: string;
    endLabel?: string;
    inputLabel?: string;
    invalidDateTime?: string;
    invalidRange?: string;
    next?: string;
    nextRange?: string;
    apply?: string;
    openDrop?: string;
    previousRange?: string;
    sectionDay?: string;
    sectionHours?: string;
    sectionMeridiem?: string;
    sectionMinutes?: string;
    sectionMonth?: string;
    sectionSeconds?: string;
    sectionYear?: string;
    separator?: string;
    startLabel?: string;
  };
  minuteStep?: number;
  name?: string;
  ranges?: DateTimeRange[];
  onChange?: (event: { value?: [string?, string?] }) => void;
  plain?: boolean;
  readOnly?: boolean;
  showSeconds?: boolean;
  value?: [string?, string?];
}

export interface DateTimeRangeInputExtendedProps
  extends DateTimeRangeInputProps,
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'defaultValue' | 'onChange' | 'value'
    > {}

declare const DateTimeRangeInput: React.FC<DateTimeRangeInputExtendedProps>;

export { DateTimeRangeInput };
