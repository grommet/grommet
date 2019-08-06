import * as React from "react";
import { AlignSelfType, ColorType, MarginType, Omit, PolymorphicType } from "../../utils";

export interface TextProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  color?:  ColorType;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  tag?: PolymorphicType;
  as?: PolymorphicType;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
  weight?: "normal" | "bold" | number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
}

declare const Text: React.FC<TextProps & Omit<JSX.IntrinsicElements['span'], 'color'>>;

export { Text };