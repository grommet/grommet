import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name: string;
  onChange?: AnyFunction;
}

declare const RadioButton: React.ComponentType<RadioButtonProps>;

export { RadioButton };
