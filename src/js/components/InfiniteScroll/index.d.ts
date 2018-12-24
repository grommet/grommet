import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface InfiniteScrollProps {
  children?: AnyFunction;
  items?: any[];
  onMore?: AnyFunction;
  renderMarker?: AnyFunction;
  scrollableAncestor?: React.ReactNode | 'window';
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.ComponentType<InfiniteScrollProps>;

export { InfiniteScroll };
