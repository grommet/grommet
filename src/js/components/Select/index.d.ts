import * as React from 'react';
import { DropProps } from '../Drop';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PlaceHolderType,
} from '../../utils';

interface onChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
  value: any;
  option: any;
  selected: number[];
}

export interface SelectProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  closeOnChange?: boolean;
  disabled?: boolean | (number | string | object)[];
  disabledKey?:
    | string
    | ((...args: any[]) => boolean);
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
  icon?: boolean | (() => React.ReactElement) | React.ReactNode;
  id?: string;
  labelKey?: string | ((option: { label: string; value: number }) => object);
  margin?: MarginType;
  messages?: { multiple?: string };
  multiple?: boolean;
  name?: string;
  onChange?: (event: onChangeEvent) => void;
  onClose?: (...args: any[]) => void;
  onMore?: (...args: any[]) => void;
  onOpen?: (...args: any[]) => void;
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
  searching?: boolean;
}

declare const Select: React.ComponentClass<SelectProps>;

export { Select };
