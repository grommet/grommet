import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface ToggleGroupProps {
  multiple?: boolean;
  defaultValue?: string | string[];
  onToggle?: (event: React.MouseEvent & { value?: string | string[] }) => void;
  options?: (
    | string
    | {
        icon?: React.ReactNode | JSX.Element;
        label?: string | React.ReactNode;
        tip?: string;
        value: string;
      }
  )[];
  value?: string | string[];
}

export interface ToggleGroupExtendedProps
  extends ToggleGroupProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], keyof ToggleGroupProps> {}

declare const ToggleGroup: React.FC<ToggleGroupExtendedProps>;

export { ToggleGroup };
