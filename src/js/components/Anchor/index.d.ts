import * as React from "react";
import { AlignSelfType, Omit, PolymorphicType, MarginType } from "../../utils";

export interface AnchorProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  color?: string | {dark?: string,light?: string};
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  onClick?: ((...args: any[]) => any);
  reverse?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  as?: PolymorphicType;
}

declare const Anchor: React.ComponentClass<AnchorProps & Omit<JSX.IntrinsicElements['a'], 'color'>>;

export { Anchor };
