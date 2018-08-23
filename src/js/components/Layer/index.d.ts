import * as React from "react";

export interface LayerProps {
  full: boolean | "vertical" | "horizontal";
  margin: "none" | "xsmall" | "small" | "medium" | "large" | {bottom: "xsmall" | "small" | "medium" | "large",horizontal: "xsmall" | "small" | "medium" | "large",left: "xsmall" | "small" | "medium" | "large",right: "xsmall" | "small" | "medium" | "large",top: "xsmall" | "small" | "medium" | "large",vertical: "xsmall" | "small" | "medium" | "large"};
  modal: boolean;
  onClickOutside: boolean;
  onEsc: (...args: any[]) => any;
  plain: boolean;
  position: "bottom" | "center" | "hidden" | "left" | "right" | "top";
  responsive: boolean;
}

declare const Layer: React.ComponentType<LayerProps>;

export { Layer };
