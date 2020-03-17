import * as React from "react";
import { BoxTypes } from "../Box";

export interface TableRowProps {
  
}

declare const TableRow: React.FC<TableRowProps & BoxTypes & JSX.IntrinsicElements['tr']>;

export { TableRow };
