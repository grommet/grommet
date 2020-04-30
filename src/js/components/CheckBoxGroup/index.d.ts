import * as React from "react";
import { BoxProps } from '../Box';
import { CheckBoxProps } from '../CheckBox' ;


export interface CheckBoxGroupProps {
  checked?: string | object;
  disabled?: boolean;
  labelKey?: string | ((...args: any[]) => any);
  name?: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | ((event: {value?: any}) => void);
  options: (string | CheckBoxProps)[];
  valueKey?: string | ((...args: any[]) => any);
}

declare const CheckBoxGroup: React.ComponentClass<CheckBoxGroupProps & BoxProps & JSX.IntrinsicElements['div']>;

export { CheckBoxGroup };
