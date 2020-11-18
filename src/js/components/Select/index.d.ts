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

interface onChangeEvent<
  OptionType = string | boolean | number | JSX.Element | object,
  ValueType = string | JSX.Element | object | (string | number | object)[]
> extends React.MouseEvent<Omit<HTMLElement, 'value'> & { value: ValueType }> {
  option: OptionType;
  value: ValueType;
  selected: ValueType extends Array<any> ? number[] : number;
}

export interface SelectProps<
  OptionType = string | boolean | number | JSX.Element | object,
  ValueType = string | JSX.Element | object | (string | number | object)[]
> {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  children?: (
    option: OptionType,
    index: number,
    options: OptionType[],
    state: { active: boolean; disabled: boolean; selected: boolean },
  ) => React.ReactNode;
  closeOnChange?: boolean;
  disabled?: boolean | (number | string | object)[];
  disabledKey?: string | ((option: OptionType) => boolean);
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
  labelKey?: string | ((option: OptionType) => React.ReactNode);
  margin?: MarginType;
  messages?: { multiple?: string };
  multiple?: boolean;
  name?: string;
  onChange?: (event: onChangeEvent<OptionType, ValueType>) => void;
  onClose?: () => void;
  onMore?: () => void;
  onOpen?: () => void;
  onSearch?: (search: string) => void;
  options: OptionType[];
  open?: boolean;
  placeholder?: PlaceHolderType;
  plain?: boolean;
  replace?: boolean;
  searchPlaceholder?: string;
  selected?: number[] | number;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: ValueType;
  valueLabel?: React.ReactNode;
  valueKey?:
    | string
    | { key: string; reduce?: boolean }
    | ((option: OptionType) => ValueType);
  emptySearchMessage?: string;
}

declare function Select<O, V>(
  props: SelectProps<O, V>,
): ReturnType<React.FC<SelectProps<O, V>>>;

export { Select };
