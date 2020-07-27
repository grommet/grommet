import * as React from "react";
import { DropProps } from "../Drop";
import { ButtonType } from "../Button";
import { 
  A11yTitleType, 
  AlignSelfType, 
  GridAreaType, 
  JustifyContentType, 
  MarginType, 
  Omit 
} from "../../utils";

export interface MenuProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  disabled?: boolean;
  dropAlign?: {top?: "top" | "bottom",bottom?: "top" | "bottom",left?: "right" | "left",right?: "right" | "left"};
  dropBackground?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean | number};
  dropTarget?: object;
  dropProps?: DropProps;
  gridArea?: GridAreaType;
  icon?: boolean | React.ReactNode;
  items: object[];
  justifyContent?: JustifyContentType;
  label?: string | React.ReactNode;
  margin?: MarginType;
  messages?: {closeMenu?: string,openMenu?: string};
  open?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
}

declare const Menu: React.FC<MenuProps & Omit<ButtonType, 'icon'>>;

export { Menu };
