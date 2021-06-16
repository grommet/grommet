import * as React from 'react';
import { Omit, TextAlignType } from '../../utils';
import { DropProps } from '../Drop';

export interface MaskedInputProps {
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropProps?: DropProps;
  focusIndicator?: boolean;
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
  textAlign?: TextAlignType;
  value?: string | number;
}

export interface MaskedInputExtendedProps
  extends MaskedInputProps,
    Omit<JSX.IntrinsicElements['input'], keyof MaskedInputProps> {}

// Keep type alias for backwards compatibility.
export type MaskedInputType = MaskedInputExtendedProps;

declare const MaskedInput: React.FC<MaskedInputExtendedProps>;

export { MaskedInput };
