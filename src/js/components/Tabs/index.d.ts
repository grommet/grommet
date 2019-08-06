import * as React from "react";
import { AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface TabsProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  activeIndex?: number;
  children: React.ReactNode;
  flex?: "grow" | "shrink" | boolean;
  justify?: "start" | "center" | "end";
  messages?: {tabContents?: string};
  onActive?: ((...args: any[]) => any);
}

declare const Tabs: React.ComponentClass<TabsProps & JSX.IntrinsicElements['div']>;

export { Tabs };
