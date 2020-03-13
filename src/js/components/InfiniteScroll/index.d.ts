import * as React from "react";

export interface InfiniteScrollProps {
  children?: ((...args: [string, number] ) => React.View);
  items?: string[];
  onMore?: (() => void);
  renderMarker?: ((...args: React.ElementType[]) => React.ElementType);
  replace?: boolean;
  scrollableAncestor?: React.ReactNode | "window";
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.ComponentClass<InfiniteScrollProps>;

export { InfiniteScroll };
