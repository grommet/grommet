import * as React from "react";

import { ButtonProps } from "../Button";
import { CalendarProps } from "../Calendar";
import { DropProps } from "../Drop";
import { MaskedInputProps } from "../MaskedInput";

export interface DateInputProps {
  buttonProps?: ButtonProps;
  calendarProps?: CalendarProps;
  defaultValue?: string | string[];
  dropProps?: DropProps;
  format?: string;
  id?: string;
  inline?: boolean;
  inputProps?: MaskedInputProps;
  name?: string;
  onChange?: ((event: { target: { value: string | string[] } }) => void);
  value?: string | string[];
}

declare const DateInput: React.FC<DateInputProps>;

export { DateInput };
