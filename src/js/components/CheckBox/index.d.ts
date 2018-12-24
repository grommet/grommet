import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface CheckBoxProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  onChange?: AnyFunction;
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
}

declare const CheckBox: React.ComponentType<CheckBoxProps>;

export { CheckBox };
