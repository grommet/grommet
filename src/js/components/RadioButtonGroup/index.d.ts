import * as React from "react";
import { BoxProps } from '../Box' 
import { A11yTitleType } from "../../utils";

export interface RadioButtonGroupProps {
  a11yTitle?: A11yTitleType;
  disabled?: boolean;
  name: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  options: (string | number | boolean | { disabled?: boolean, id?: string, label?: (string | React.ReactNode), value: string | number | boolean })[];
  value?: string | number | boolean | object;
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps & BoxProps & JSX.IntrinsicElements['div']>;

export { RadioButtonGroup };
