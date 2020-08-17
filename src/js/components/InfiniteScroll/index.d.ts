import * as React from 'react';

export interface InfiniteScrollProps {
  children?: (...args: [string, number]) => React.ReactElement;
  items?: (string | Record<string, any>)[];
  onMore?: () => void;
  renderMarker?: (marker: React.ReactElement) => React.ReactElement;
  replace?: boolean;
  scrollableAncestor?: React.ReactNode | 'window';
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.ComponentClass<InfiniteScrollProps>;

export { InfiniteScroll };
