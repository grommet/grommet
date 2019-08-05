import * as React from "react";
import { MarginType } from "../../utils";

export interface TableProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: MarginType;
  caption?: string;
}

declare const Table: React.FC<TableProps & JSX.IntrinsicElements['table']>;

export { Table };
