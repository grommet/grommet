import * as React from "react";

export interface TextProps {
  color: string;
  margin: "none" | "small" | "medium" | "large" | {bottom: "small" | "medium" | "large",top: "small" | "medium" | "large"};
  size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  tag: string;
  textAlign: "start" | "center" | "end";
  truncate: boolean;
  weight: "normal" | "bold" | number;
}

declare const Text: React.ComponentType<TextProps>;

export { Text };
