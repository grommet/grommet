import * as React from "react";
import { 
  A11yTitleType,
  AlignSelfType,
  ColorType, 
  GridAreaType, 
  MarginType, 
  Omit, 
  PolymorphicType,
  TextAlignType 
} from "../../utils";

export interface TextProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType,
  margin?: MarginType;
  color?:  ColorType;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  tag?: PolymorphicType;
  as?: PolymorphicType;
  textAlign?: TextAlignType;
  truncate?: boolean;
  weight?: "normal" | "bold" | number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
}

declare const Text: React.FC<TextProps & Omit<JSX.IntrinsicElements['span'], 'color'>>;

export { Text };