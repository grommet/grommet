import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataSearchProps {}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataSearchExtendedProps
  extends BoxProps,
  DataSearchProps,
    divProps {}

declare const DataSearch: React.FC<DataSearchExtendedProps>;

export { DataSearch };
