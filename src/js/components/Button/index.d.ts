import * as React from "react";
import { 
  A11yTitleType,
  AlignSelfType, 
  BackgroundType,
  ColorType,
  GapType, 
  GridAreaType, 
  MarginType, 
  Omit, 
  PolymorphicType
} from "../../utils";

export interface ButtonProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  active?: boolean;
  color?: ColorType;
  disabled?: boolean;
  fill?: "horizontal" | "vertical" | boolean;
  focusIndicator?: boolean;
  gap?: GapType;
  hoverIndicator?: BackgroundType | boolean;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: ((...args: any[]) => any);
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  type?: "button" | "reset" | "submit";
  as?: PolymorphicType;
}

declare const Button: React.FC<ButtonProps & Omit<JSX.IntrinsicElements['button'], 'color'>>;

export { Button };
