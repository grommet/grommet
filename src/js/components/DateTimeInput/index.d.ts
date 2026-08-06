// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface DateTimeInputProps {
  defaultValue?: string;
  disabled?: boolean;
  format?: '12' | '24';
  id?: string;
  locale?: string;
  inline?: boolean;
  messages?: {
    activeSection?: string;
    activeSectionValue?: string;
    chooseDateTime?: string;
    inputLabel?: string;
    invalidDateTime?: string;
    openDrop?: string;
    sectionDay?: string;
    sectionHours?: string;
    sectionMeridiem?: string;
    sectionMinutes?: string;
    sectionMonth?: string;
    sectionSeconds?: string;
    sectionYear?: string;
  };
  minuteStep?: number;
  name?: string;
  onChange?: (event: { value?: string }) => void;
  readOnly?: boolean;
  showSeconds?: boolean;
  value?: string;
}

export interface DateTimeInputExtendedProps
  extends DateTimeInputProps,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'defaultValue' | 'onChange' | 'value'
    > {}

declare const DateTimeInput: React.FC<DateTimeInputExtendedProps>;

export { DateTimeInput };
