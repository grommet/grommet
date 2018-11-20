import * as React from "react";

export interface DropButtonProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  disabled?: boolean;
  dropAlign?: {top: "top" | "bottom",bottom: "top" | "bottom",right: "left" | "right",left: "left" | "right"};
  dropContent: JSX.Element;
  dropTarget?: object;
  onClose?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  open?: boolean;
}

declare const DropButton: React.ComponentType<DropButtonProps>;

export { DropButton };
