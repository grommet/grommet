import * as React from 'react';

export interface DataSortProps {
  drop?: boolean;
}

export interface DataSortExtendedProps extends DataSortProps {}

declare const DataSort: React.FC<DataSortExtendedProps>;

export { DataSort };
