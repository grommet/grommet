import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataFilterProps {
  property: string;
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataFilterExtendedProps
  extends BoxProps,
  DataFilterProps,
    divProps {}

declare const DataFilter: React.FC<DataFilterExtendedProps>;

export { DataFilter };
