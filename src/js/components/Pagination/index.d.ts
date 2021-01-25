import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface PaginationProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  numberEdgePages?: number;
  numberItems?: number;
  numberMiddlePages?: number;
  onChange?: (...args: any[]) => void;
  page?: number;
  size?: 'small' | 'medium' | 'large';
  step?: number;
}

declare const Pagination: React.FC<PaginationProps>;
export type PaginationType = PaginationProps;

export { Pagination };
