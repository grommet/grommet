import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToggleButtonGroupProps {
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: (
    | string
    | number
    | boolean
    | {
        disabled?: boolean;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
}

export interface ToggleButtonGroupExtendedProps
  extends ToggleButtonGroupProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], 'children' | 'onClick' | 'onChange'> {}

declare const ToggleButtonGroup: React.FC<ToggleButtonGroupExtendedProps>;

export { ToggleButtonGroup };
