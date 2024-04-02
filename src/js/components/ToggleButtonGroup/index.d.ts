import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToggleButtonGroupProps {
  multiple?: boolean;
  defaultValue?: string | string[];
  // may need to change onChange TODO
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: (
    | string
    | {
        icon?: React.ReactNode | JSX.Element;
        id?: string;
        label?: string | React.ReactNode;
        value: string;
      }
  )[];
  value?: string | [];
}

export interface ToggleButtonGroupExtendedProps
  extends ToggleButtonGroupProps,
    BoxProps,
    Omit<
      JSX.IntrinsicElements['div'],
      'children' | 'onClick' | 'onChange' | 'defaultValue'
    > {}

declare const ToggleButtonGroup: React.FC<ToggleButtonGroupExtendedProps>;

export { ToggleButtonGroup };
