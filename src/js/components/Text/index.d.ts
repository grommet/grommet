import * as React from "react";

export interface TextProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "small" | "medium" | "large" | {bottom: "small" | "medium" | "large" | string,top: "small" | "medium" | "large" | string} | string;
  color?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  tag?: string;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
  weight?: "normal" | "bold" | number;
}

declare const Text: React.ComponentType<TextProps>;

export { Text };
