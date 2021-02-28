import * as React from 'react';
import { Omit, ColorType } from '../../utils';

export interface RangeSelectorProps {
  color?: ColorType;
  direction?: 'horizontal' | 'vertical';
  invert?: boolean;
  max?: number;
  messages?: { lower?: string; upper?: string };
  min?: number;
  onChange?: (...args: any[]) => void;
  opacity?: 'weak' | 'medium' | 'strong' | string | boolean;
  round?: 'xsmall' | 'small' | 'medium' | 'large' | 'full' | string;
  size?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'full'
    | string;
  step?: number;
  values: number[];
}

export interface RangeSelectorExtendedProps
  extends RangeSelectorProps,
    Omit<JSX.IntrinsicElements['div'], 'color' | 'onChange'> {}

declare const RangeSelector: React.FC<RangeSelectorProps &
  Omit<JSX.IntrinsicElements['div'], 'color'>>;

export { RangeSelector };
