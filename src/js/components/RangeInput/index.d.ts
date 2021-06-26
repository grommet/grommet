import * as React from 'react';
import { A11yTitleType } from '../../utils';

export interface RangeInputProps {
  a11yTitle?: A11yTitleType;
  id?: string;
  inputDirection?: 'right' | 'left' | 'above' | 'below' | string;
  inputValue?: boolean;
  min?: number | string;
  max?: number | string;
  name?: string;
  step?: number;
  value?: number | string;
}

export interface RangeInputExtendedProps
  extends RangeInputProps,
    Omit<JSX.IntrinsicElements['input'], 'step' | 'value'> {}

declare const RangeInput: React.FC<RangeInputExtendedProps>;

export { RangeInput };
