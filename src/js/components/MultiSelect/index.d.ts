import * as React from 'react';
import { DropProps } from '../Drop';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PlaceHolderType,
} from '../../utils';

export interface MultiSelectProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  children?: (...args: any[]) => any;
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
  emptySearchMessage?: string | React.ReactNode;
  focusIndicator?: boolean;
  helpContent?: React.ReactNode;
  icon?: boolean | ((...args: any[]) => any) | React.ReactNode | React.FC;
  id?: string;
  labelKey?: string | ((...args: any[]) => string | React.ReactNode);
  limit?: number;
  margin?: MarginType;
  messages?: { multiple?: string };
  name?: string;
  onChange?: (...args: any[]) => void;
  onClose?: (...args: any[]) => any;
  onMore?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  onSearch?: (search: string) => void;
  open?: boolean;
  options: (string | boolean | number | JSX.Element | object)[];
  placeholder?: PlaceHolderType;
  plain?: boolean;
  replace?: boolean;
  searchPlaceholder?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: string | JSX.Element | object | (string | number | object)[];
  valueKey?:
    | string
    | { key: string; reduce?: boolean }
    | ((...args: any[]) => string);
  valueLabel?: React.ReactNode | ((...args: any[]) => string | React.ReactNode);
  visibleSelection?: boolean;
}

// Try without Omit<> to see where we define our own attributes for overrides
// value, name, id, onChange, placeholder
export interface MultiSelectExtendedProps
  extends MultiSelectProps,
    Omit<JSX.IntrinsicElements['input'], keyof MultiSelectProps> {}

declare const MultiSelect: React.FC<MultiSelectExtendedProps>;

export { MultiSelect };
