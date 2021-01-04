import * as React from 'react';

import { ButtonType } from '../Button';
import { CalendarType } from '../Calendar';
import { DropType } from '../Drop';
import { MaskedInputType } from '../MaskedInput';

export interface DateInputProps {
  buttonProps?: ButtonType;
  calendarProps?: CalendarType;
  defaultValue?: string | string[];
  dropProps?: DropType;
  format?: string;
  id?: string;
  inline?: boolean;
  inputProps?: MaskedInputType;
  name?: string;
  onChange?: (event: { value: string | string[] }) => void;
  value?: string | string[];
}

declare const DateInput: React.FC<DateInputProps>;

export { DateInput };
