import * as React from 'react';

import { ButtonType } from '../Button';
import { ClockProps } from '../Clock';
import { DropType } from '../Drop';
import { MaskedInputType } from '../MaskedInput';

export interface TimeInputProps {
  buttonProps?: ButtonType;
  clockProps?: ClockProps;
  defaultValue?: string | string[];
  dropProps?: DropType;
  format?: string;
  id?: string;
  inline?: boolean;
  inputProps?: MaskedInputType;
  name?: string;
  onChange?: (event: { target: { value: string | string[] } }) => void;
  value?: string | string[];
}

declare const TimeInput: React.FC<TimeInputProps>;

export { TimeInput };
