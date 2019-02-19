import * as React from "react";

export interface CheckBoxProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  onChange?: ((...args: any[]) => any);
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
}

declare const CheckBox: React.ComponentClass<CheckBoxProps & JSX.IntrinsicElements['input']>;

export { CheckBox };
