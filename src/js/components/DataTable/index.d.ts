import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin, GrommetSizeSToXL,
} from '../../types/common';

export interface DataTableProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  columns?: {align?: 'center' | 'start' | 'end', aggregate?: 'avg' | 'max' | 'min' | 'sum', footer?: React.ReactNode | {aggregate?: boolean}, header?: string | React.ReactNode | {aggregate?: boolean}, property: string, render?: AnyFunction, search?: boolean}[];
  data?: {}[];
  groupBy?: string;
  onMore?: AnyFunction;
  onSearch?: AnyFunction;
  resizeable?: boolean;
  size?: GrommetSizeSToXL | string;
  sortable?: boolean;
}

declare const DataTable: React.ComponentType<DataTableProps>;

export { DataTable };
