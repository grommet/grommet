import * as React from "react";

export interface TabsProps {
  activeIndex?: number;
  children: React.ReactNode;
  justify?: "start" | "center" | "end";
  messages?: {tabContents: string};
  onActive?: (...args: any[]) => any;
}

declare const Tabs: React.StatelessComponent<TabsProps>;

export { Tabs };
