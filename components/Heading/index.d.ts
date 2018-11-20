import * as React from "react";

export interface HeadingProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string;
  level?: "1" | "2" | "3" | "4" | "5" | "6" | "1" | "2" | "3" | "4" | "5" | "6";
  responsive?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
}

declare const Heading: React.ComponentType<HeadingProps>;

export { Heading };
