import * as React from 'react';

import { AlignSelfType, GridAreaType, MarginType } from '../../utils';
import { DropType } from '../Drop';

export interface TimeInputProps {
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  defaultValue?: Date | string;
  disabled?: boolean;
  messages?: {
    closeTimePicker?: string;
    hoursLabel?: string;
    invalidTime?: string;
    minutesLabel?: string;
    openTimePicker?: string;
    outOfBounds?: string;
    periodLabel?: string;
    secondsLabel?: string;
  };
  min?: string;
  max?: string;
  minuteStep?: number;
  name?: string;
  onChange?: (event: { value: string }) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  plain?: boolean;
  readOnly?: boolean;
  step?: number;
  secondStep?: number;
  showSeconds?: boolean;
  timeFormat?: '12hr' | '24hr';
  value?: Date | string;
  dropProps?: DropType;
  icon?: React.ReactNode;
  openOnFocus?: boolean;
  reverse?: boolean;
}

export interface TimeInputExtendedProps
  extends TimeInputProps,
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'defaultValue' | 'onChange' | 'value' | 'size'
    > {}

declare const TimeInput: React.ForwardRefExoticComponent<
  TimeInputExtendedProps & React.RefAttributes<HTMLInputElement>
>;

export { TimeInput };
