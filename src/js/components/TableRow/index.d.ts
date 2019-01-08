import * as React from "react";

export interface TableRowProps {
  hoverIndicator?: boolean;
}

declare const TableRow: React.ComponentType<TableRowProps & JSX.IntrinsicElements['tr']>;

export { TableRow };
