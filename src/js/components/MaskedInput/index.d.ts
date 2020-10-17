import * as React from 'react';
import { DropProps } from '../Drop';

export interface MaskedInputProps {
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropProps?: DropProps;
  icon?: JSX.Element;
  id?: string;
  mask?: Array<{
    length?: number | number[];
    fixed?: string;
    options?: string[] | number[];
    regexp?: {};
    placeholder?: string;
  }>;
  name?: string;
  onBlur?: (event: React.FocusEvent) => any;
  plain?: boolean;
  reverse?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: string | number;
}

declare const MaskedInput: React.ComponentClass<MaskedInputProps &
  Omit<JSX.IntrinsicElements['input'], keyof MaskedInputProps>>;
export type MaskedInputType = MaskedInputProps &
  Omit<JSX.IntrinsicElements['input'], keyof MaskedInputProps>;

export { MaskedInput };
