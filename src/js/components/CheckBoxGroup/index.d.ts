import * as React from 'react';
import { BoxProps } from '../Box/index';
import { CheckBoxProps } from '../CheckBox/index';
import { Omit } from '../../utils';

interface OnChangeEvent {
  value: string;
  option: string | CheckBoxProps;
}

export interface CheckBoxType
  extends Omit<CheckBoxProps & JSX.IntrinsicElements['input'], 'checked'> {
  [key: string]: any;
}

export interface CheckBoxGroupProps {
  value?: (number | string)[];
  defaultValue?: (number | string)[];
  disabled?: boolean;
  labelKey?: string;
  name?: string;
  onChange?: (event?: OnChangeEvent) => void;
  options: (CheckBoxType | string)[];
  valueKey?: string;
}

export interface CheckBoxGroupExtendedProps
  extends CheckBoxGroupProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], 'onClick' | keyof CheckBoxGroupProps> {}

declare const CheckBoxGroup: React.FC<CheckBoxGroupExtendedProps>;

export { CheckBoxGroup };
