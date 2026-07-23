import * as React from 'react';

import { DropType } from '../Drop';

export interface DateTimeInputProps {
  defaultValue?: string;
  disabled?: boolean;
  dropProps?: DropType;
  format?: '12' | '24';
  id?: string;
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
  value?: string;
}

export interface DateTimeInputExtendedProps
  extends DateTimeInputProps,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'defaultValue' | 'onChange' | 'onError' | 'size' | 'value'
    > {}

declare const DateTimeInput: React.FC<DateTimeInputExtendedProps>;

export { DateTimeInput };
