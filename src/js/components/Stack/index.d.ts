import * as React from "react";

export interface StackProps {
  anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "bottom-left" | "top-right" | "bottom-right";
  fill?: boolean;
  guidingChild?: number | "first" | "last";
}

declare const Stack: React.ComponentType<StackProps>;

export { Stack };
