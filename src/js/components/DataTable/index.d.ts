import * as React from "react";
import { 
  A11yTitleType, 
  AlignSelfType, 
  GridAreaType, 
  MarginType,
} from "../../utils";

export interface DataTableProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  background?: 
    string | 
    {
      color?: string, dark?: string, light?: string,
      header?: string | {color?: string, dark?: string, light?: string},
      body?: string | {color?: string, dark?: string, light?: string} | string[],
      footer?: string | {color?: string, dark?: string, light?: string}
    };
  border?: boolean | "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color?: string | {dark?: string,light?: string},side?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string,header?: boolean | "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color?: string | {dark?: string,light?: string},side?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string},body?: boolean | "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color?: string | {dark?: string,light?: string},side?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string},footer?: boolean | "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all" | {color?: string | {dark?: string,light?: string},side?: "top" | "left" | "bottom" | "right" | "horizontal" | "vertical" | "all",size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string}};
  gridArea?: GridAreaType;
  margin?: MarginType;
  columns?: {
    align?: "center" | "start" | "end",
    aggregate?: "avg" | "max" | "min" | 'sum',
    footer?: React.ReactNode | {aggregate?: boolean},
    header?: string | React.ReactNode | {aggregate?: boolean},
    primary?: boolean,property: string,
    render?: ((...args: any[]) => any),
    search?: boolean,
    sortable?: boolean,
    verticalAlign?: "middle" | "top" | "bottom"}[];
  data?: {}[];
  groupBy?: string | { property: string, expand: Array<string>, onExpand: ((...args: any[]) => any) };
  onClickRow?: (((event: React.MouseEvent) => void)) | ((event: {datum?: {}, index?: number}) => void);
  onMore?: ((...args: any[]) => any);
  onSearch?: ((search: string) => void);
  onSort?: ((sort: { property: string, direction: "asc" | "desc" }) => void);
  pad?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,header?:"none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string},body?:"none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string},footer?:"none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string}} | string;
  primaryKey?: string | boolean;
  replace?: boolean;
  resizeable?: boolean;
  rowProps?: { [_:string]: { background?: {}, border?: {}, pad?: {}}};
  size?: "small" | "medium" | "large" | "xlarge" | string;
  sort?: { property: string, direction: "asc" | "desc" };
  sortable?: boolean;
  step?: number;
}

declare const DataTable: React.ComponentClass<DataTableProps & JSX.IntrinsicElements['table']>;

export { DataTable };
