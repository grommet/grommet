import * as React from 'react';

export interface TableRowProps {}

type htmlTableRowProps = JSX.IntrinsicElements['tr'];

export interface TableRowExtendedProps
  extends TableRowProps,
    htmlTableRowProps {}

declare const TableRow: React.FC<TableRowExtendedProps>;

export { TableRow };
