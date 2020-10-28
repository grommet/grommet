import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

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
type PadSizeType =
  | 'none'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | string;
type PadType =
  | PadSizeType
  | {
      bottom?: PadSizeType;
      horizontal?: PadSizeType;
      left?: PadSizeType;
      right?: PadSizeType;
      top?: PadSizeType;
      vertical?: PadSizeType;
    };
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
  primaryKey?: string | ((item: any) => React.ReactElement);
  secondaryKey?: string | ((item: any) => React.ReactElement);
  step?: number;
  action?: (item: any, index: number) => void;
}

declare const List: React.ComponentClass<ListProps &
  JSX.IntrinsicElements['ul']>;

export { List };
