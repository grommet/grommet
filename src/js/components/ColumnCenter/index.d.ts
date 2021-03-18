import * as React from 'react';
import { GridProps } from '../Grid';

export interface ColumnCenterProps {
  gutter?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
}

declare const ColumnCenter: React.FC<GridProps &
  ColumnCenterProps &
  JSX.IntrinsicElements['div']>;

export { ColumnCenter };
