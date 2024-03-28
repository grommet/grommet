import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToggleButtonGroupProps {
  multiple?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: (
    | string
    | number
    | boolean
    | {
        disabled?: boolean;
        icon?: React.ReactNode;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
  value?: string | number | object;
}

export interface ToggleButtonGroupExtendedProps
  extends ToggleButtonGroupProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], 'children' | 'onClick' | 'onChange'> {}

declare const ToggleButtonGroup: React.FC<ToggleButtonGroupExtendedProps>;

export { ToggleButtonGroup };
