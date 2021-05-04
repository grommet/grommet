import * as React from 'react';
import { MarginType } from '../../utils';

type widthType = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
export interface ColumnsProps {
  columns?: {
    hide?: boolean;
    layer?: boolean;
    responsive?: { hide?: boolean; layer?: boolean };
    width?: widthType;
  }[];
  margin?: MarginType;
  width?: widthType;
}

type columnsProps = JSX.IntrinsicElements['div'];

export interface ColumnsExtendedProps extends ColumnsProps, columnsProps {}

declare const Columns: React.FC<ColumnsExtendedProps>;

export { Columns };
