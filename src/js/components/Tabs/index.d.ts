import * as React from "react";

export interface TabsProps {
  activeIndex?: number;
  children: any[];
  justify?: "start" | "center" | "end";
  messages?: {tabContents: string};
  onActive?: (...args: any[]) => any;
}

declare const Tabs: React.ComponentType<TabsProps>;

export { Tabs };
