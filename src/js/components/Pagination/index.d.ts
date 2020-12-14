import * as React from 'react';
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from '../../utils';

export interface PaginationProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  numEdgePages?: number;
  numItems?: number;
  numMiddlePages?: number;
  onChange?: (...args: any[]) => void;
  page?: number;
  step?: number;
}

declare const Pagination: React.FC<PaginationProps>;
export type PaginationType = PaginationProps;

export { Pagination };
