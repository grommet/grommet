import * as React from 'react';
import { RadioButtonGroupProps } from '../RadioButtonGroup/index';
import { CheckBoxProps } from '../CheckBox/index';
import { CheckBoxGroupProps } from '../CheckBoxGroup/index';

interface OnChangeEvent {
  value: string;
  option: string | CheckBoxProps;
}

export interface CheckBoxType
  extends Omit<CheckBoxProps & JSX.IntrinsicElements['input'], 'checked'> {
  [key: string]: any;
}

export interface ToggleButtonGroupProps {
  exclusive?: boolean;
  onChange?: (event?: OnChangeEvent) => void;
  options: (
    | string
    | number
    | boolean
    | CheckBoxType
    | {
        disabled?: boolean;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
  value?: string | number | boolean | object | (number | string)[];
}

export interface ToggleButtonGoupExtendedProps
  extends Omit<
      RadioButtonGroupProps,
      'name' | 'value' | 'options' | 'onChange'
    >,
    Omit<CheckBoxGroupProps, 'value' | 'options' | 'onChange'>,
    ToggleButtonGroupProps {}

declare const ToggleButtonGroup: React.FC<ToggleButtonGoupExtendedProps>;

export { ToggleButtonGroup };
