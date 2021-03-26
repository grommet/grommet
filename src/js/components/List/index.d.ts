import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  PadType,
} from '../../utils';
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

export interface ListProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  as?: string;
  background?:
    | string
    | string[]
    | { light: string | string[]; dark: string | string[] };
  border?: BorderType;
  data?: string[] | {}[];
  gridArea?: GridAreaType;
  itemProps?: {
    [_: string]: { background?: string; border?: BorderType; pad?: PadType };
  };
  margin?: MarginType;
  onMore?: () => void;
  onClickItem?:
    | ((event: React.MouseEvent) => void)
    | ((event: { item?: {}; index?: number }) => void);
  pad?: PadType;
  paginate?: boolean | PaginationType;
  primaryKey?: string | ((item: any) => React.ReactElement);
  secondaryKey?: string | ((item: any) => React.ReactElement);
  show?: number | { page?: number };
  step?: number;
  action?: (item: any, index: number) => void;
}

type ulProps = JSX.IntrinsicElements['ul'];

export interface ListExtendedProps extends ListProps, ulProps {}

declare const List: React.FC<ListExtendedProps>;

export { List };
