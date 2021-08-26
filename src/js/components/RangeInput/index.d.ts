import * as React from 'react';
import { A11yTitleType } from '../../utils';

interface ColorI {
  color: string;
  value: number;
  opacity?: number;
}

export interface RangeInputProps {
  a11yTitle?: A11yTitleType;
  id?: string;
  min?: number | string;
  max?: number | string;
  name?: string;
  step?: number;
  color?: string | ColorI[];
  value?: number | string;
}

export interface RangeInputExtendedProps
  extends RangeInputProps,
    Omit<JSX.IntrinsicElements['input'], 'step' | 'value'> {}

declare const RangeInput: React.FC<RangeInputExtendedProps>;

export { RangeInput };
