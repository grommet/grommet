import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataSummaryProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataSummaryExtendedProps
  extends BoxProps,
  DataSummaryProps,
    divProps {}

declare const DataSummary: React.FC<DataSummaryExtendedProps>;

export { DataSummary };
