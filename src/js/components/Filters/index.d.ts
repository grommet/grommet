import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface FiltersProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface FiltersExtendedProps
  extends BoxProps,
  FiltersProps,
    divProps {}

declare const Filters: React.FC<FiltersExtendedProps>;

export { Filters };
