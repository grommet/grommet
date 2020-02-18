import * as React from "react";
import { A11yTitleType, AlignSelfType, AnimateType, GridAreaType, MarginType } from "../../utils";

export interface CardProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  animate?: AnimateType
  size?: "small" | "medium" | "large" | string;
  onClick?: ((...args: any[]) => any);
  children?: React.ReactNode;
  image?: string;
}

declare const Card: React.FC<CardProps>;

export { Card };
