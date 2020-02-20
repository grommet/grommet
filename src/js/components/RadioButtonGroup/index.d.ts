import * as React from "react";
import { BoxProps } from '../Box' 

export interface RadioButtonGroupProps {
  disabled?: boolean;
  name: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  options: (string | { disabled?: boolean, id?: string, label?: (string | React.ReactNode), value: string})[];
  value?: string | object;
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps & BoxProps>;

export { RadioButtonGroup };
