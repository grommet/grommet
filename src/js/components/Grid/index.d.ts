import * as React from 'react';
import {
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeXSToXL,
} from '../../types/common';

export interface GridProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  align?: GrommetAlignSelfOrJustify;
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  areas?: {name?: string, start?: number[], end?: number[]}[];
  columns?: GrommetSizeXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'flex' | 'auto' | GrommetSizeXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'flex' | 'auto'[] | string[] | GrommetSizeXSToXL | {count: 'fit' | 'fill' | number, size: GrommetSizeXSToXL | GrommetSizeXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'flex' | 'auto'[] | string} | string;
  fill?: 'horizontal' | 'vertical' | boolean;
  gap?: 'small' | 'medium' | 'large' | 'none' | {row?: 'small' | 'medium' | 'large' | 'none' | string, column?: 'small' | 'medium' | 'large' | 'none' | string} | string;
  justify?: GrommetAlignSelfOrJustify;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
  rows?: GrommetSizeXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'flex' | 'auto' | GrommetSizeXSToXL | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'flex' | 'auto'[] | string[] | GrommetSizeXSToXL | string;
  tag?: string;
  as?: string;
}

declare const Grid: React.ComponentType<GridProps>;

export { Grid };
