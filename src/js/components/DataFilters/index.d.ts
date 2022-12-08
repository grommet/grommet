import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataFiltersProps {
  drop?: boolean;
  layer?: boolean;
  search?: boolean;
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataFiltersExtendedProps
  extends BoxProps,
    DataFiltersProps,
    divProps {}

declare const DataFilters: React.FC<DataFiltersExtendedProps>;

export { DataFilters };
