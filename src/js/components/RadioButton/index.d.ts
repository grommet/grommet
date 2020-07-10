import * as React from "react";
import { A11yTitleType } from "../../utils";

export interface RadioButtonProps {
  a11yTitle?: A11yTitleType;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name: string;
}

declare const RadioButton: React.ComponentClass<RadioButtonProps & JSX.IntrinsicElements['input']>;

export { RadioButton };
