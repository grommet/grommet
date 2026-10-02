// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface TimeInputProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'id' | 'defaultValue' | 'onChange'
  > {
  defaultValue?: string;
  disabled?: boolean;
  format?: '12' | '24';
  id?: string;
  inline?: boolean;
  messages?: {
    activePeriodValue?: string;
    activeSection?: string;
    activeSectionValue?: string;
    chooseTime?: string;
    currentValue?: string;
    inputLabel?: string;
    invalidTime?: string;
    openDrop?: string;
    sectionHours?: string;
    sectionMeridiem?: string;
    sectionMinutes?: string;
    sectionSeconds?: string;
  };
  minuteStep?: number;
  name?: string;
  onChange?: (event: { value?: string }) => void;
  readOnly?: boolean;
  showSeconds?: boolean;
  value?: string;
}

export interface TimeInputRef {
  focus: () => void;
}

declare const TimeInput: React.ForwardRefExoticComponent<
  TimeInputProps & React.RefAttributes<TimeInputRef>
>;

export { TimeInput };
