import * as React from "react";

export interface CheckBoxProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  onChange?: ((event: React.ChangeEvent) => void);
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
}

declare const CheckBox: React.FC<CheckBoxProps & JSX.IntrinsicElements['input']>;

export { CheckBox };
