import * as React from "react";
import { DropProps } from "../Drop";

export interface MenuProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  disabled?: boolean;
  dropAlign?: {top?: "top" | "bottom",bottom?: "top" | "bottom",left?: "right" | "left",right?: "right" | "left"};
  dropBackground?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean | number};
  dropTarget?: object;
  dropProps?: DropProps;
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  icon?: boolean | React.ReactNode;
  items: object[];
  label?: string | React.ReactNode;
  messages?: {closeMenu?: string,openMenu?: string};
  open?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
}

declare const Menu: React.ComponentClass<MenuProps & JSX.IntrinsicElements['button']>;

export { Menu };
