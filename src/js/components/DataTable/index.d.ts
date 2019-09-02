import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface DataTableProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  columns?: {align?: "center" | "start" | "end",aggregate?: "avg" | "max" | "min" | "sum",footer?: React.ReactNode | {aggregate?: boolean},header?: string | React.ReactNode | {aggregate?: boolean},primary?: boolean,property: string,render?: ((...args: any[]) => any),search?: boolean,sortable?: boolean}[];
  data?: {}[];
  groupBy?: string | { property: string, expand: Array<string>, onExpand: ((...args: any[]) => any) };
  onMore?: ((...args: any[]) => any);
  onSearch?: ((...args: any[]) => any);
  primaryKey?: string;
  resizeable?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  sortable?: boolean;
  step?: number;
}

declare const DataTable: React.ComponentClass<DataTableProps & JSX.IntrinsicElements['table']>;

export { DataTable };
