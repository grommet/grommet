import * as React from "react";
import { BoxProps } from '../Box';
import { CheckBoxProps } from '../CheckBox' ;

interface OnChangeEvent{
  value: string;
  option: string | CheckBoxProps;
}

export interface CheckBoxGroupProps {
  value?: (number | string )[]
  disabled?: boolean;
  labelKey?: string | ((...args: any[]) => any);
  name?: string;
  onChange?: ((event?: OnChangeEvent) => void);
  options: (string | CheckBoxProps)[];
  valueKey?: string | ((...args: any[]) => any);
}

declare const CheckBoxGroup: React.ComponentClass<CheckBoxGroupProps & BoxProps & JSX.IntrinsicElements['div']>;

export { CheckBoxGroup };
