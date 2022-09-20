import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface FilterBarProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface FilterBarExtendedProps
  extends BoxProps,
  FilterBarProps,
    divProps {}

declare const FilterBar: React.FC<FilterBarExtendedProps>;

export { FilterBar };
