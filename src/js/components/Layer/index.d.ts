import * as React from "react";

export interface LayerProps {
  full?: boolean | "vertical" | "horizontal";
  margin?: "none" | "xsmall" | "small" | "medium" | "large" | {bottom: "xsmall" | "small" | "medium" | "large" | string,horizontal: "xsmall" | "small" | "medium" | "large" | string,left: "xsmall" | "small" | "medium" | "large" | string,right: "xsmall" | "small" | "medium" | "large" | string,top: "xsmall" | "small" | "medium" | "large" | string,vertical: "xsmall" | "small" | "medium" | "large" | string} | string;
  modal?: boolean;
  onClickOutside?: (...args: any[]) => any;
  onEsc?: (...args: any[]) => any;
  plain?: boolean;
  position?: "bottom" | "center" | "hidden" | "left" | "right" | "top";
  responsive?: boolean;
}

declare const Layer: React.ComponentType<LayerProps>;

export { Layer };
