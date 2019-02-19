import * as React from "react";

export interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name: string;
  onChange?: ((...args: any[]) => any);
}

declare const RadioButton: React.ComponentClass<RadioButtonProps & JSX.IntrinsicElements['input']>;

export { RadioButton };
