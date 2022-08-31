import * as React from 'react';

export interface TableBodyProps {}

type htmlTableBodyProps = JSX.IntrinsicElements['tbody'];

export interface TableBodyExtendedProps
  extends TableBodyProps,
    htmlTableBodyProps {}

declare const TableBody: React.FC<TableBodyExtendedProps>;

export { TableBody };
