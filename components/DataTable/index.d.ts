import * as React from "react";

export interface DataTableProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
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
