import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface TableProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  caption?: string;
}

declare const Table: React.FC<TableProps & JSX.IntrinsicElements['table']>;

export { Table };
