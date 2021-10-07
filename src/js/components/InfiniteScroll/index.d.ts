import * as React from 'react';

export interface InfiniteScrollProps {
  items?: (string | number | React.ReactElement | Record<string, any>)[];
  onMore?: () => void;
  renderMarker?: (marker: React.ReactElement) => React.ReactElement;
  replace?: boolean;
  scrollableAncestor?: React.ReactNode | 'window';
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.FC<InfiniteScrollProps>;

export { InfiniteScroll };
