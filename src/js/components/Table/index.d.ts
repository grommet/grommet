import * as React from "react";
import { AlignSelfType, MarginType } from "../../utils";

export interface TableProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  caption?: string;
}

declare const Table: React.FC<TableProps & JSX.IntrinsicElements['table']>;

export { Table };
