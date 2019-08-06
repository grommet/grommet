import * as React from "react";
import { AlignSelfType, ColorType, MarginType, Omit, PolymorphicType} from "../../utils";

export interface ButtonProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  active?: boolean;
  color?: ColorType;
  disabled?: boolean;
  fill?: "horizontal" | "vertical" | boolean;
  focusIndicator?: boolean;
  gap?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  hoverIndicator?: boolean | string | "background" | {background?: boolean | string};
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

declare const Button: React.ComponentClass<ButtonProps & Omit<JSX.IntrinsicElements['button'], 'color'>>;

export { Button };
