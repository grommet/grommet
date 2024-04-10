import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToggleGroupProps {
  multiple?: boolean;
  defaultValue?: string | string[];
  // may need to change onChange TODO
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: (
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

export interface ToggleGroupExtendedProps
  extends ToggleGroupProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], keyof ToggleGroupProps> {}

declare const ToggleGroup: React.FC<ToggleGroupExtendedProps>;

export { ToggleGroup };
