import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataSortProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataSortExtendedProps
  extends BoxProps,
  DataSortProps,
    divProps {}

declare const DataSort: React.FC<DataSortExtendedProps>;

export { DataSort };
