import * as React from 'react';
import {
  AnyFunction, GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeSToXL,
} from '../../types/common';

export interface SelectProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  children?: AnyFunction;
  closeOnChange?: boolean;
  disabled?: boolean | number | string | object[];
  disabledKey?: string | ((...args: any[]) => any);
  dropAlign?: {top?: 'top' | 'bottom', bottom?: 'top' | 'bottom', right?: 'left' | 'right', left?: 'left' | 'right'};
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  focusIndicator?: boolean;
  labelKey?: string | ((...args: any[]) => any);
  messages?: {multiple?: string};
  multiple?: boolean;
  onChange?: AnyFunction;
  onClose?: AnyFunction;
  onOpen?: AnyFunction;
  onSearch?: AnyFunction;
  options: string | JSX.Element | object[];
  placeholder?: string | React.ReactNode;
  plain?: boolean;
  searchPlaceholder?: string;
  selected?: number | number[];
  size?: GrommetSizeSToXL | string;
  value?: string | JSX.Element | object | string | object[];
  valueLabel?: React.ReactNode;
  valueKey?: string | ((...args: any[]) => any);
  emptySearchMessage?: string;
}

declare const Select: React.ComponentType<SelectProps>;

export { Select };
