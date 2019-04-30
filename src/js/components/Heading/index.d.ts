import * as React from "react";
import { Omit, PolymorphicType } from "../../utils";

export interface HeadingProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  as?: PolymorphicType;
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string | {dark?: string,light?: string};
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
