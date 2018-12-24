import * as React from 'react';
import { AnyFunction, GrommetSizeXXSToXL } from '../../types/common';

export interface RangeSelectorProps {
  color?: string | {dark?: string, light?: string};
  direction?: 'horizontal' | 'vertical';
  invert?: boolean;
  max?: number;
  messages?: {lower?: string, upper?: string};
  min?: number;
  onChange?: AnyFunction;
  opacity?: 'weak' | 'medium' | 'strong';
  round?: 'xsmall' | 'small' | 'medium' | 'large' | 'full' | string;
  size?: GrommetSizeXXSToXL | 'full' | string;
  step?: number;
  values: number[];
}

declare const RangeSelector: React.ComponentType<RangeSelectorProps>;

export { RangeSelector };
