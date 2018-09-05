import * as React from "react";

export interface DropButtonProps {
  a11yTitle?: string;
  disabled?: boolean;
  dropAlign?: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  dropContent: JSX.Element;
  dropTarget?: object;
  onClose?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  open?: boolean;
}

declare const DropButton: React.StatelessComponent<DropButtonProps>;

export { DropButton };
