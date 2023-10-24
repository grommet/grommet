import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataViewProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick' | 'property'>;

export interface DataViewExtendedProps
  extends BoxProps,
    DataViewProps,
    divProps {}

declare const DataView: React.FC<DataViewExtendedProps>;

export { DataView };
