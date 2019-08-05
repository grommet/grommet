import * as React from "react";
import { MarginType } from "../../utils";

export interface StackProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: MarginType;
  anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "bottom-left" | "top-right" | "bottom-right";
  fill?: boolean;
  guidingChild?: number | "first" | "last";
  interactiveChild?: number | "first" | "last";
}

declare const Stack: React.ComponentClass<StackProps & JSX.IntrinsicElements['div']>;

export { Stack };
