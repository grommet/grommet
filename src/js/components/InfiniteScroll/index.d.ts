import * as React from 'react';

export interface InfiniteScrollProps {
  items?: (string | number | React.ReactElement | Record<string, any>)[];
  onMore?: () => void;
  renderMarker?: (marker: React.ReactElement) => React.ReactElement;
  replace?: boolean;
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.FC<InfiniteScrollProps>;

export { InfiniteScroll };
