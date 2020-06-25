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

type Sections<TBody, THeader = TBody, TFooter = TBody> = {
  header?: THeader;
  body?: TBody;
  footer?: TFooter;
};

export type ColumnSizeType =
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

export type MouseClick<TRowType> = React.MouseEvent<HTMLTableRowElement> & {
  datum: TRowType;
  index: number;
};

export type KeyPress<TRowType> = React.KeyboardEvent & { datum: TRowType };

export interface ColumnConfig<TRowType> {
  align?: 'center' | 'start' | 'end';
  aggregate?: 'avg' | 'max' | 'min' | 'sum';
  footer?: React.ReactNode | { aggregate?: boolean };
  header?: string | React.ReactNode | { aggregate?: boolean };
  primary?: boolean;
  property: string;
  render?: (datum: TRowType) => React.ReactNode;
  search?: boolean;
  sortable?: boolean;
  size?: ColumnSizeType | string;
  verticalAlign?: 'middle' | 'top' | 'bottom';
}

export interface DataTableProps<TRowType = any> {
  a11yTitle?: A11yTitleType;

  // Appearance
  alignSelf?: AlignSelfType;
  background?:
    | BackgroundType
    | Sections<BackgroundType | string[], BackgroundType, BackgroundType>;
  border?: BorderType | Sections<BorderType>;
  columns?: ColumnConfig<TRowType>[];
  gridArea?: GridAreaType;
  margin?: MarginType;
  pad?: PadType | Sections<PadType>;
  resizeable?: boolean;
  replace?: boolean;
  rowProps?: {
    [primaryValue: string]: {
      background?: BackgroundType;
      border?: BorderType;
      pad?: PadType;
    };
  };
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;

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
  onClickRow?: (event: MouseClick<TRowType> | KeyPress<TRowType>) => void;
  onMore?: () => void;
  onSearch?: (search: string) => void;
  onSort?: (sort: { property: string; direction: 'asc' | 'desc' }) => void;
}

declare class DataTable<TRowType = any> extends React.Component<
  DataTableProps<TRowType> & JSX.IntrinsicElements['table']
> {}

export { DataTable };
