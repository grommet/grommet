import * as React from "react";

export interface AnchorProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string;
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: (...args: any[]) => any;
  reverse?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
}

declare const Anchor: React.ComponentType<AnchorProps>;

export { Anchor };
