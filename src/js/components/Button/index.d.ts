import * as React from "react";
import { 
  A11yTitleType,
  AlignSelfType, 
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
  hoverIndicator?: boolean | string | "background" | {background?: boolean | string};
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon?: JSX.Element;
  label?: React.ReactNode;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  type?: "button" | "reset" | "submit";
  as?: PolymorphicType;
}

declare const Button: React.ComponentClass<ButtonProps & Omit<JSX.IntrinsicElements['button'], 'color'>>;

export { Button };
