import * as React from "react";

export interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name: string;
  onChange?: ((event: React.ChangeEvent) => void);
}

declare const RadioButton: React.ComponentClass<RadioButtonProps & JSX.IntrinsicElements['input']>;

export { RadioButton };
