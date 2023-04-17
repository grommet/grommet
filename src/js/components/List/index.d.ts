import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PadType,
} from '../../utils';
import { BoxTypes } from '../Box';
import { PaginationType } from '../Pagination';

type SizeType =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | string;
type SideType =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'horizontal'
  | 'vertical'
  | 'all';
type BorderType =
  | boolean
  | SideType
  | {
      color?: string | { dark?: string; light?: string };
      side?: SideType;
      size?: SizeType;
    };

export interface ListProps<ListItemType> {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: string;
  background?:
    | string
    | string[]
    | { light: string | string[]; dark: string | string[] };
  border?: BorderType;
  children?: (...args: any[]) => any;
  data?: ListItemType[];
  disabled?: string[];
  gridArea?: GridAreaType;
  defaultItemProps?: BoxTypes;
  itemKey?: string | ((item: ListItemType) => string | number);
  itemProps?: {
    [_: string]: { background?: string; border?: BorderType; pad?: PadType };
  };
  margin?: MarginType;
  onActive?: (index: number) => void;
  onClickItem?:
    | ((event: React.MouseEvent) => void)
    | ((event: { item?: ListItemType; index?: number }) => void);
  onMore?: () => void;
  onOrder?: (orderedData: ListItemType[]) => void;
  pad?: PadType;
  paginate?: boolean | PaginationType;
  pinned?: (string | number)[];
  primaryKey?: string | ((item: ListItemType) => React.ReactElement);
  secondaryKey?: string | ((item: ListItemType) => React.ReactElement);
  show?: number | { page?: number };
  step?: number;
  action?: (item: ListItemType, index: number) => void;
}

type ulProps = Omit<JSX.IntrinsicElements['ul'], 'children'>;

export interface ListExtendedProps<ListItemType>
  extends ListProps<ListItemType>,
    ulProps {}

declare const List: <ListItemType = string | {}>(
  p: React.PropsWithChildren<ListExtendedProps<ListItemType>>,
) => React.ReactElement<ListExtendedProps<ListItemType>>;

export { List };
