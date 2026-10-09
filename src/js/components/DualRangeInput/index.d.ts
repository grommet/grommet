import * as React from 'react';
import { A11yTitleType, ColorType } from '../../utils';

export interface DualRangeInputProps {
  a11yTitle?: A11yTitleType;
  color?: ColorType;
  defaultValues?: number[];
  label?: boolean | ((value: number) => React.ReactNode);
  max?: number;
  messages?: { lower?: string; upper?: string };
  min?: number;
  name?: string;
  onChange?: (values: [number, number]) => void;
  step?: number;
  values?: number[];
}

export interface DualRangeInputExtendedProps
  extends DualRangeInputProps,
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      'color' | 'onChange'
    > {}

declare const DualRangeInput: React.FC<DualRangeInputExtendedProps>;

export { DualRangeInput };
