import * as React from "react";

export interface StackProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "bottom-left" | "top-right" | "bottom-right";
  fill?: boolean;
  guidingChild?: number | "first" | "last";
  interactiveChild?: number | "first" | "last";
}

declare const Stack: React.ComponentClass<StackProps & JSX.IntrinsicElements['div']>;

export { Stack };
