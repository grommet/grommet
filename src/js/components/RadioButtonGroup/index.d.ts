import * as React from "react";

export interface RadioButtonGroupProps {
  name: string;
  onChange?: ((...args: any[]) => any);
  options: (string | { disabled?: boolean, id?: string, label?: (string | React.ReactNode), value: string})[];
  value?: string;
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps & JSX.IntrinsicElements['div']>;

export { RadioButtonGroup };
