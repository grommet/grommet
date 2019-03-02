import * as React from "react";
import { Omit } from "../../utils";

export interface ParagraphProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  color?: string | {dark?: string,light?: string};
  responsive?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  textAlign?: "start" | "center" | "end";
}

declare const Paragraph: React.FC<ParagraphProps & Omit<JSX.IntrinsicElements['p'], 'color'>>;

export { Paragraph };
