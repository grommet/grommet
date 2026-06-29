import * as React from 'react';

import { AlignSelfType, GridAreaType, MarginType } from '../../utils';

export interface TimeInputProps {
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  bounds?: [string, string];
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
  minuteStep?: number;
  onChange?: (event: { value: string }) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  plain?: boolean;
  readOnly?: boolean;
  secondStep?: number;
  showSeconds?: boolean;
  timeFormat?: '12hr' | '24hr';
  value?: Date | string;
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
