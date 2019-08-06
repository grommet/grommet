import * as React from "react";
import { A11yTitleType, AlignSelfType, MarginType } from "../../utils";

export interface ImageProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  fit?: "cover" | "contain";
  fallback?: string;
  gridArea?: string;
  margin?: MarginType;
  opacity?: "weak" | "medium" | "strong" | string | boolean;
}

declare const Image: React.FC<ImageProps & JSX.IntrinsicElements['img']>;

export { Image };
