import * as React from 'react';
import { DropProps } from '../Drop';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PlaceHolderType,
  ColorType,
} from '../../utils';

type SelectOption = string | boolean | number | JSX.Element | object;

interface onChangeEvent
  extends React.MouseEvent<
    Omit<HTMLElement, 'value'> & { value: SelectOption | SelectOption[] }
  > {
  option: SelectOption;
  value: SelectOption | SelectOption[];
}

export interface SelectProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  children?: (
    option: SelectOption,
    index: number,
    options: SelectOption[],
    state: { active: boolean; disabled: boolean; selected: boolean },
  ) => any;
  closeOnChange?: boolean;
  disabled?: boolean | (number | string | object)[];
  disabledKey?: string | ((option: SelectOption) => boolean);
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
  icon?:
    | boolean
    | ((props: {
        color: ColorType;
        size: 'small' | 'medium' | 'large' | 'xlarge' | string;
      }) => React.ReactNode)
    | React.ReactNode;
  id?: string;
  labelKey?: string | ((option: SelectOption) => any);
  margin?: MarginType;
  messages?: { multiple?: string };
  multiple?: boolean;
  name?: string;
  onChange?: (event: onChangeEvent) => void;
  onClose?: () => void;
  onMore?: () => void;
  onOpen?: () => void;
  onSearch?: (search: string) => void;
  options: SelectOption[];
  open?: boolean;
  placeholder?: PlaceHolderType;
  plain?: boolean;
  replace?: boolean;
  searchPlaceholder?: string;
  selected?: number | number[];
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: SelectOption | SelectOption[];
  valueLabel?: React.ReactNode;
  valueKey?:
    | string
    | { key: string; reduce?: boolean }
    | ((option: SelectOption) => any);
  emptySearchMessage?: string;
}

declare const Select: React.ComponentClass<SelectProps>;

export { Select };
