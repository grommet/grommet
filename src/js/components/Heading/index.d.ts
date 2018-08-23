import * as React from "react";

export interface HeadingProps {
  color: string;
  level: "1" | "2" | "3" | "4" | "1" | "2" | "3" | "4";
  margin: "none" | "small" | "medium" | "large" | {bottom: "none" | "small" | "medium" | "large",top: "none" | "small" | "medium" | "large"};
  responsive: boolean;
  size: "small" | "medium" | "large";
  textAlign: "start" | "center" | "end";
  truncate: boolean;
}

declare const Heading: React.ComponentType<HeadingProps>;

export { Heading };
