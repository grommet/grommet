import * as React from 'react';
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from '../../utils';

export interface PaginationProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  children?: (...args: any[]) => any;
  gridArea?: GridAreaType;
  items?: number;
  margin?: MarginType;
  numEdgePages?: number;
  numMiddlePages?: number;
  onChange?: (...args: any[]) => void;
  page?: number;
  show?: number | { page?: number, index?: number };
  showFirst?: boolean;
  showLast?: boolean;
  step?: number;
}

declare const Pagination: React.FC<PaginationProps>;
export type PaginationType = PaginationProps;

export { Pagination };
