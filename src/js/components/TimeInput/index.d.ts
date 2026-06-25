import * as React from 'react';

import { MaskedInputType } from '../MaskedInput';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';
import { ButtonType } from '../Button';
import { DropType } from '../Drop';

export interface TimeInputProps {
  buttonProps?: ButtonType;
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  defaultValue?: Date | string;
  disabled?: boolean;
  id?: string;
  inputProps?: MaskedInputType;
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
