import * as React from "react";
import { AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface ImageProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  fit?: "cover" | "contain";
  fallback?: string;
  gridArea?: GridAreaType;
  margin?: MarginType;
  opacity?: "weak" | "medium" | "strong" | string | boolean;
}

declare const Image: React.FC<ImageProps & JSX.IntrinsicElements['img']>;

export { Image };
