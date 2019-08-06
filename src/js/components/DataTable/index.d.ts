import * as React from "react";
import { AlignSelfType, MarginType } from "../../utils";

export interface DataTableProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  columns?: {align?: "center" | "start" | "end",aggregate?: "avg" | "max" | "min" | "sum",footer?: React.ReactNode | {aggregate?: boolean},header?: string | React.ReactNode | {aggregate?: boolean},primary?: boolean,property: string,render?: ((...args: any[]) => any),search?: boolean,sortable?: boolean}[];
  data?: {}[];
  groupBy?: string;
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
