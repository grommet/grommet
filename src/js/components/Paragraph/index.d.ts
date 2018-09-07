import * as React from "react";

export interface ParagraphProps {
  color?: string;
  margin?: "none" | "small" | "medium" | "large" | {bottom: "small" | "medium" | "large" | string,top: "small" | "medium" | "large" | string} | string;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  textAlign?: "start" | "center" | "end";
}

declare const Paragraph: React.ComponentType<ParagraphProps>;

export { Paragraph };
