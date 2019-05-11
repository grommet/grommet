import * as React from "react";

export interface DropProps {
  align?: {top?: "top" | "bottom",bottom?: "top" | "bottom",right?: "left" | "right",left?: "left" | "right"};
  elevation?: "none" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  onClickOutside?: ((...args: any[]) => any);
  onEsc?: ((...args: any[]) => any);
  overflow?: "auto" | "hidden" | "scroll" | "visible" | {horizontal?: "auto" | "hidden" | "scroll" | "visible",vertical?: "auto" | "hidden" | "scroll" | "visible"} | string;
  responsive?: boolean;
  restrictFocus?: boolean;
  stretch?: boolean;
  target?: object;
  plain?: boolean;
}

declare const Drop: React.ComponentClass<DropProps & JSX.IntrinsicElements['div']>;

export { Drop };
