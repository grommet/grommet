import * as React from 'react';

export interface TableFooterProps {}

type htmlTableFooterProps = JSX.IntrinsicElements['tfoot'];

export interface TableFooterExtendedProps
  extends TableFooterProps,
    htmlTableFooterProps {}

declare const TableFooter: React.FC<TableFooterExtendedProps>;

export { TableFooter };
