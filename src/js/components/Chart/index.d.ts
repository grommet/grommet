import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeXXSToXL,
  GrommetSizeXSToXL,
} from '../../types/common';

export interface ChartProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  bounds?: number[][];
  color?: string | {color: string, opacity: 'weak' | 'medium' | 'strong' | boolean};
  onClick?: AnyFunction;
  onHover?: AnyFunction;
  overflow?: boolean;
  round?: boolean;
  size?: GrommetSizeXXSToXL | 'full' | {
    height: GrommetSizeXXSToXL | 'full' | string,
    width: GrommetSizeXXSToXL | 'full' | string,
  } | string;
  thickness?: 'hair' | GrommetSizeXSToXL | 'none' | string;
  type?: 'bar' | 'line' | 'area';
  values: number | number[] | {label?: string, onClick: AnyFunction, onHover: AnyFunction, value: number | number[]}[];
}

declare const Chart: React.ComponentType<ChartProps>;

export { Chart };
