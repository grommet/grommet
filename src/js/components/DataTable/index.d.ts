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

export interface DataTableProps<TRowType = any> {
  a11yTitle?: A11yTitleType;
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
    size?:
      | 'small'
      | 'medium'
      | 'large'
      | 'xlarge'
      | '1/2'
      | '1/4'
      | '2/4'
      | '3/4'
      | '1/3'
      | '2/3'
      | string;
    verticalAlign?: 'middle' | 'top' | 'bottom';
  }[];
  data?: TRowType[];
  groupBy?:
    | string
    | {
        property: string;
        expand: Array<string>;
        onExpand: (expandedKeys: string[]) => void;
      };
  onClickRow?: (event: { datum: TRowType; index?: number }) => void;
  onMore?: () => void;
  onSearch?: (search: string) => void;
  onSort?: (sort: { property: string; direction: 'asc' | 'desc' }) => void;
  pad?: PadType | Sections<PadType>;
  primaryKey?: string | boolean;
  replace?: boolean;
  resizeable?: boolean;
  rowProps?: {
    [_: string]: {
      background?: BackgroundType;
      border?: BorderType;
      pad?: PadType;
    };
  };
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  sort?: { property: string; direction: 'asc' | 'desc' };
  sortable?: boolean;
  step?: number;
}

declare class DataTable<TRowType = any> extends React.Component<
  DataTableProps<TRowType> & JSX.IntrinsicElements['table']
> {}

export { DataTable };
