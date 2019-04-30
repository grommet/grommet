import * as React from "react";
import { PolymorphicType } from "../../utils";

export interface TextProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string | {dark?: string,light?: string};
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  tag?: PolymorphicType;
  as?: PolymorphicType;
  textAlign?: "start" | "center" | "end";
  truncate?: boolean;
  weight?: "normal" | "bold" | number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
}

declare const Text: React.FC<TextProps & JSX.IntrinsicElements['span']>;

export { Text };