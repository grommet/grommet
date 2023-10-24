import * as React from 'react';
import { BoxTypes } from '../Box/index';

export interface TableCellProps {
  plain?: boolean | 'noPad'; // noPad is for internal use only
  scope?: 'col' | 'row';
  size?:
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | '1/2'
    | '1/3'
    | '2/3'
    | '1/4'
    | '2/4'
    | '3/4'
    | 'auto'
    | string;
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

// We combine BoxTypes & JSX.IntrinsicElements['td'] inline here since BoxTypes
// is a combination of BoxProps & JSX.IntrinsicElements['div'], and there is a
// large overlap between td and div attributes.
export interface TableCellExtendedProps
  extends TableCellProps,
    Omit<BoxTypes & JSX.IntrinsicElements['td'], 'scope'> {}

declare const TableCell: React.FC<TableCellExtendedProps>;

export { TableCell };
