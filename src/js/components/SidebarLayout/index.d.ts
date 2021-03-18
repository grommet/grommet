import * as React from 'react';
import { GridProps } from '../Grid';

export interface ColumnsProps {
  aside?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  center?: boolean;
  gutter?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  sidebar?: React.ReactNode;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  width?: { max?: string };
}

declare const Columns: React.FC<GridProps &
  ColumnsProps &
  JSX.IntrinsicElements['div']>;

export { Columns };
