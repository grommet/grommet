import * as React from "react";

export interface ButtonProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  active?: boolean;
  color?: string;
  disabled?: boolean;
  fill?: boolean;
  focusIndicator?: boolean;
  hoverIndicator?: boolean | "background" | {background: boolean | string};
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: (...args: any[]) => any;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  type?: "button" | "reset" | "submit";
}

declare const Button: React.ComponentType<ButtonProps>;

export { Button };
