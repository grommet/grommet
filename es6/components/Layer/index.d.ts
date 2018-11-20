import * as React from "react";

export interface LayerProps {
  full?: boolean | "vertical" | "horizontal";
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | string} | string;
  modal?: boolean;
  onClickOutside?: (...args: any[]) => any;
  onEsc?: (...args: any[]) => any;
  plain?: boolean;
  position?: "bottom" | "center" | "hidden" | "left" | "right" | "top";
  responsive?: boolean;
}

declare const Layer: React.ComponentType<LayerProps>;

export { Layer };
