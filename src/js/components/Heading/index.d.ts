import * as React from "react";
import { AlignSelfType, ColorType, MarginType, Omit, PolymorphicType } from "../../utils";

export interface HeadingProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  as?: PolymorphicType;
  gridArea?: string;
  margin?: MarginType;
  color?: ColorType;
  level?: "1" | "2" | "3" | "4" | "5" | "6" | 1 | 2 | 3 | 4 | 5 | 6;
  responsive?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | string;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
}

declare const Heading: React.FC<HeadingProps & (
  Omit<JSX.IntrinsicElements['h1'], 'color'>
  | Omit<JSX.IntrinsicElements['h2'], 'color'>
  | Omit<JSX.IntrinsicElements['h3'], 'color'>
  | Omit<JSX.IntrinsicElements['h4'], 'color'>
  | Omit<JSX.IntrinsicElements['h5'], 'color'>
  | Omit<JSX.IntrinsicElements['h6'], 'color'>)>;

export { Heading };
