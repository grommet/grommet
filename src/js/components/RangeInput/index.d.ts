import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface RangeInputProps {
  id?: string;
  min?: number | string;
  max?: number | string;
  name?: string;
  onChange?: AnyFunction;
  step?: number;
  value?: number | string;
}

declare const RangeInput: React.ComponentType<RangeInputProps>;

export { RangeInput };
