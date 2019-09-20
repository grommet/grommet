import * as React from "react";
import { BoxProps } from '../Box' 

export interface RadioButtonGroupProps {
  name: string;
  onChange?: ((...args: any[]) => any);
  options: (string | { disabled?: boolean, id?: string, label?: (string | React.ReactNode), value: string})[];
  value?: string;
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps & BoxProps>;

export { RadioButtonGroup };
