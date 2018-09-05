import * as React from "react";

export interface DataTableProps {
  columns?: {align: "center" | "start" | "end",aggregate: "avg" | "max" | "min" | "sum",footer: React.ReactNode | {aggregate: boolean},header: string | React.ReactNode | {aggregate: boolean},property: string,render: (...args: any[]) => any,search: boolean}[];
  data?: {}[];
  groupBy?: string;
  onMore?: (...args: any[]) => any;
  onSearch?: (...args: any[]) => any;
  resizeable?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
  sortable?: boolean;
}

declare const DataTable: React.ComponentType<DataTableProps>;

export { DataTable };
