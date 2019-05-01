import * as React from "react";
import { Omit, PolymorphicType } from "../../utils";

export interface ButtonProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  active?: boolean;
  color?: string | {dark?: string,light?: string};
  disabled?: boolean;
  fill?: "horizontal" | "vertical" | boolean;
  focusIndicator?: boolean;
  gap?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  hoverIndicator?: boolean | string | "background" | {background?: boolean | string};
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: ((...args: any[]) => any);
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  type?: "button" | "reset" | "submit";
  as?: PolymorphicType;
}

declare const Button: React.ComponentClass<ButtonProps & Omit<JSX.IntrinsicElements['button'], 'color'>>;

export { Button };
