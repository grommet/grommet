import * as React from "react";

export interface MenuProps {
  disabled: boolean;
  dropAlign: {top: "top" | "bottom",bottom: "top" | "bottom",left: "right" | "left",right: "right" | "left"};
  dropBackground: string | {color: string,opacity: "weak" | "medium" | "strong" | boolean};
  dropTarget: object;
  icon: boolean | React.ReactNode;
  items?: object[];
  label: string | React.ReactNode;
  messages: {closeMenu: string,openMenu: string};
  size: "small" | "medium" | "large" | "xlarge";
}

declare const Menu: React.ComponentType<MenuProps>;

export { Menu };
