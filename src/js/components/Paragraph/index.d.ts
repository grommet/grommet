import * as React from "react";
import { AlignSelfType, ColorType, MarginType, Omit } from "../../utils";

export interface ParagraphProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  color?: ColorType;
  responsive?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  textAlign?: "start" | "center" | "end";
}

declare const Paragraph: React.FC<ParagraphProps & Omit<JSX.IntrinsicElements['p'], 'color'>>;

export { Paragraph };
