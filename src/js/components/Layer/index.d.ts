import * as React from "react";
import { MarginType } from "../../utils";

export interface LayerProps {
  animate?: boolean;
  animation?: "none" | "slide" | "fadeIn" | boolean;
  full?: boolean | "vertical" | "horizontal";
  margin?: MarginType;
  modal?: boolean;
  onClickOutside?: ((...args: any[]) => any);
  onEsc?: ((...args: any[]) => any);
  plain?: boolean;
  position?: "bottom" | "bottom-left" | "bottom-right" | "center" | "hidden" | "left" | "right" | "top" | "top-left" | "top-right";
  responsive?: boolean;
}

declare const Layer: React.ComponentClass<LayerProps & JSX.IntrinsicElements['div']>;

export { Layer };
