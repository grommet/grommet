import * as React from 'react';
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from '../../utils';

export interface PaginationProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  defaultPage?: number;
  edgeCount?: number;
  gridArea?: GridAreaType;
  margin?: MarginType;
  middleCount?: number;
  onChange?: (...args: any[]) => void;
  page?: number;
  totalPages?: number;
}

declare const Pagination: React.FC<PaginationProps>;
export type PaginationType = PaginationProps;

export { Pagination };
