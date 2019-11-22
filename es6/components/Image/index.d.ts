import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface ImageProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  fit?: "cover" | "contain";
  fallback?: string;
  gridArea?: GridAreaType;
  margin?: MarginType;
  opacity?: "weak" | "medium" | "strong" | string | boolean;
  fillProp?: boolean;
}

declare const Image: React.FC<ImageProps & JSX.IntrinsicElements['img']>;

export { Image };
