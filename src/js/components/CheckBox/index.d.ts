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

declare const CheckBox: React.FC<CheckBoxProps &
  JSX.IntrinsicElements['input']>;

export { CheckBox };
