import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataFilterProps {
  property: string;
  options?: (
    | string
    | number
    | {
        label: string;
        value: string | number | boolean;
      }
  )[];
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick' | 'property'>;

export interface DataFilterExtendedProps
  extends BoxProps,
    DataFilterProps,
    divProps {}

declare const DataFilter: React.FC<DataFilterExtendedProps>;

export { DataFilter };
