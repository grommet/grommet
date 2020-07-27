import * as React from "react";
import { BoxProps } from '../Box';
import { CheckBoxProps } from '../CheckBox' ;
import { Omit } from "../../utils";

interface OnChangeEvent{
  value: string;
  option: string | CheckBoxProps;
}

export type CheckBoxType = Omit<CheckBoxProps & JSX.IntrinsicElements['input'], 'checked'>;
export interface CheckBoxGroupProps {
  value?: (number | string )[]
  disabled?: boolean;
  labelKey?: string;  
  name?: string;
  onChange?: ((event?: OnChangeEvent) => void);
  options: (CheckBoxType)[];
  valueKey?: string;
}

declare const CheckBoxGroup: React.ComponentClass<CheckBoxGroupProps & BoxProps & JSX.IntrinsicElements['div']>;

export { CheckBoxGroup };
