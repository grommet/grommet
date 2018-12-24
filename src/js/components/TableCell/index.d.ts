import * as React from 'react';
import { GrommetSizeXXSToXL } from '../../types/common';

export interface TableCellProps {
  plain?: boolean;
  scope?: 'col' | 'row';
  size?: GrommetSizeXXSToXL | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | string;
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

declare const TableCell: React.ComponentType<TableCellProps & JSX.IntrinsicElements['td']>;

export { TableCell };
