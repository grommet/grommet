import * as React from "react";

export interface DropProps {
  align?: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  onClickOutside?: (...args: any[]) => any;
  onEsc?: (...args: any[]) => any;
  responsive?: boolean;
  restrictFocus?: boolean;
  stretch?: boolean;
  target: object;
}

declare const Drop: React.ComponentType<DropProps>;

export { Drop };
