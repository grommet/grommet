import * as React from "react";

export interface HeadingProps {
  color?: string;
  level?: "1" | "2" | "3" | "4" | "1" | "2" | "3" | "4";
  margin?: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  responsive?: boolean;
  size?: "small" | "medium" | "large" | string;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
}

declare const Heading: React.ComponentType<HeadingProps>;

export { Heading };
