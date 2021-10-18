import * as React from 'react';

import { ButtonType } from '../Button';
import { CalendarType } from '../Calendar/index';
import { DropType } from '../Drop';
import { MaskedInputType } from '../MaskedInput';
import { A11yTitleType } from '../../utils';

export interface DateInputProps {
  a11yTitle?: A11yTitleType;
  buttonProps?: ButtonType | { open?: boolean };
  calendarProps?: CalendarType;
  defaultValue?: string | string[];
  dropProps?: DropType;
  format?: string;
  id?: string;
  inline?: boolean;
  inputProps?: MaskedInputType;
  messages?: {
    enterCalendar?: string;
    exitCalendar?: string;
  };
  name?: string;
  onChange?: (event: { value: string | string[] }) => void;
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | string;
  value?: string | string[];
}
export interface DateInputExtendedProps
  extends DateInputProps,
    Omit<
      JSX.IntrinsicElements['input'],
      'defaultValue' | 'onChange' | 'value' | 'size'
    > {}

declare const DateInput: React.FC<DateInputExtendedProps>;

export { DateInput };
