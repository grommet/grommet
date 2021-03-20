import * as React from 'react';
import { DropProps } from '../Drop';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PlaceHolderType,
} from '../../utils';

export interface SelectProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  children?: (...args: any[]) => any;
  clear?: boolean | { position?: 'top' | 'bottom'; label?: string };
  closeOnChange?: boolean;
  defaultValue?: string | number | object | (string | number | object)[];
  disabled?: boolean | (number | string | object)[];
  disabledKey?: string | ((...args: any[]) => any);
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  dropProps?: DropProps;
  focusIndicator?: boolean;
  icon?: boolean | ((...args: any[]) => any) | React.ReactNode;
  id?: string;
  labelKey?: string | ((...args: any[]) => any);
  margin?: MarginType;
  messages?: { multiple?: string };
  multiple?: boolean;
  name?: string;
  onChange?: (...args: any[]) => void;
  onClose?: (...args: any[]) => any;
  onMore?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  onSearch?: (search: string) => void;
  options: (string | boolean | number | JSX.Element | object)[];
  open?: boolean;
  placeholder?: PlaceHolderType;
  plain?: boolean;
  replace?: boolean;
  searchPlaceholder?: string;
  selected?: number | number[];
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: string | JSX.Element | object | (string | number | object)[];
  valueLabel?: React.ReactNode;
  valueKey?:
    | string
    | { key: string; reduce?: boolean }
    | ((...args: any[]) => any);
  emptySearchMessage?: string;
}

declare const Select: React.FC<SelectProps>;

export { Select };
