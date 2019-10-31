import * as React from "react";
import { 
  A11yTitleType,
  AlignSelfType, 
  ColorType, 
  GridAreaType, 
  MarginType, 
  Omit, 
  PolymorphicType 
} from "../../utils";

export interface AnchorProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  color?: ColorType;
  disabled?: boolean;
  gridArea?: GridAreaType;
  href?: string;
  icon?: JSX.Element;
  label?: React.ReactNode;
  margin?: MarginType;
  reverse?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | string;
  as?: PolymorphicType;
}

declare const Anchor: React.FC<AnchorProps & Omit<JSX.IntrinsicElements['a'], 'color'>>;

export { Anchor };
