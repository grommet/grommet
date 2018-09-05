import * as React from "react";

export interface ParagraphProps {
  color?: string;
  margin?: "none" | "small" | "medium" | "large" | {bottom: "small" | "medium" | "large",top: "small" | "medium" | "large"};
  size?: "small" | "medium" | "large" | "xlarge";
  textAlign?: "start" | "center" | "end";
}

declare const Paragraph: React.StatelessComponent<ParagraphProps>;

export { Paragraph };
