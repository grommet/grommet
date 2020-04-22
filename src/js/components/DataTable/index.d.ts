import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
  BackgroundType,
  PadType,
  BorderType,
} from '../../utils';

type Sections<T> = { header?: T; body?: T; footer?: T };

type ColumnSizeType =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | '1/2'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/3'
  | '2/3';

type MouseClick<TRowType> = React.MouseEvent<HTMLTableRowElement> & {
  datum: TRowType;
  index: number;
};

type KeyboardClick<TRowType> = React.KeyboardEvent & { datum: TRowType };

export interface DataTableProps<TRowType = any> {
  a11yTitle?: A11yTitleType;

  // Appearance
  alignSelf?: AlignSelfType;
  background?: BackgroundType | Sections<BorderType>;
  border?: BorderType | Sections<BorderType>;
  gridArea?: GridAreaType;
  margin?: MarginType;
  columns?: {
    align?: 'center' | 'start' | 'end';
    aggregate?: 'avg' | 'max' | 'min' | 'sum';
    footer?: React.ReactNode | { aggregate?: boolean };
    header?: string | React.ReactNode | { aggregate?: boolean };
    primary?: boolean;
    property: string;
    render?: (datum: TRowType) => any;
    search?: boolean;
    sortable?: boolean;
    size?: ColumnSizeType | string;
    verticalAlign?: 'middle' | 'top' | 'bottom';
  }[];
  pad?: PadType | Sections<PadType>;
  resizeable?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  replace?: boolean;
  rowProps?: {
    [primaryValue: string]: {
      background?: BackgroundType;
      border?: BorderType;
      pad?: PadType;
    };
  };

  // Data
  data?: TRowType[];
  groupBy?:
    | string
    | {
        property: string;
        expand: Array<string>;
        onExpand: (expandedKeys: string[]) => void;
      };
  primaryKey?: string | boolean;
  sort?: { property: string; direction: 'asc' | 'desc' };
  sortable?: boolean;
  step?: number;

  // Events
  onClickRow?: (event: MouseClick<TRowType> | KeyboardClick<TRowType>) => void;
  onMore?: () => void;
  onSearch?: (search: string) => void;
  onSort?: (sort: { property: string; direction: 'asc' | 'desc' }) => void;
}

declare class DataTable<TRowType = any> extends React.Component<
  DataTableProps<TRowType> & JSX.IntrinsicElements['table']
> {}

export { DataTable };
