import * as React from 'react';
import { A11yTitleType } from '../../utils';

export interface CheckBoxProps {
  a11yTitle?: A11yTitleType;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
}

type inputType = JSX.IntrinsicElements['input'];

export interface CheckBoxExtendedProps extends CheckBoxProps, inputType {}

declare const CheckBox: React.FC<CheckBoxExtendedProps>;

export { CheckBox };
