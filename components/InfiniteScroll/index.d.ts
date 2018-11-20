import * as React from "react";

export interface InfiniteScrollProps {
  children?: (...args: any[]) => any;
  items?: any[];
  onMore?: (...args: any[]) => any;
  renderMarker?: (...args: any[]) => any;
  scrollableAncestor?: React.ReactNode | "window";
  show?: number;
  step?: number;
}

declare const InfiniteScroll: React.ComponentType<InfiniteScrollProps>;

export { InfiniteScroll };
