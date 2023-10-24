import * as React from 'react';

export interface TableHeaderProps {}

type htmlTableHeaderProps = JSX.IntrinsicElements['thead'];

export interface TableHeaderExtendedProps
  extends TableHeaderProps,
    htmlTableHeaderProps {}

declare const TableHeader: React.FC<TableHeaderExtendedProps>;

export { TableHeader };
