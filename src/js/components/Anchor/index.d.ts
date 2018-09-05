import * as React from "react";

export interface AnchorProps {
  a11yTitle?: string;
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: (...args: any[]) => any;
  primary?: boolean;
  reverse?: boolean;
}

declare const Anchor: React.StatelessComponent<AnchorProps>;

export { Anchor };
