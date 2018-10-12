import * as React from "react";

export interface ButtonProps {
  a11yTitle?: string;
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
