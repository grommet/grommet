import * as React from "react";
import { ButtonProps } from "../Button";
import { DropProps } from "../Drop";

export interface DropButtonProps {
  dropAlign?: {top?: "top" | "bottom",bottom?: "top" | "bottom",right?: "left" | "right",left?: "left" | "right"};
  dropContent: JSX.Element;
  dropTarget?: object;
  dropProps?: DropProps;
  onClose?: ((...args: any[]) => any);
  onOpen?: ((...args: any[]) => any);
  open?: boolean;
}

declare const DropButton: React.ComponentClass<DropButtonProps & ButtonProps>;

export { DropButton };
