import * as React from "react";

export interface TabsProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  activeIndex?: number;
  children: React.ReactNode;
  flex?: "grow" | "shrink" | boolean;
  justify?: "start" | "center" | "end";
  messages?: {tabContents?: string};
  onActive?: ((...args: any[]) => any);
}

declare const Tabs: React.ComponentClass<TabsProps & JSX.IntrinsicElements['div']>;

export { Tabs };
