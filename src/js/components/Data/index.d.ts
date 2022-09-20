import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataProps {
  data: object[];
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataExtendedProps
  extends BoxProps,
  DataProps,
    divProps {}

declare const Data: React.FC<DataExtendedProps>;

export { Data };
