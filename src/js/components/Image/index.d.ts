import * as React from "react";
import {
  A11yTitleType, AlignSelfType, FillType, GridAreaType, MarginType,
} from "../../utils";

export interface ImageProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  fallback?: string;
  fit?: "cover" | "contain";
  fillProp?: FillType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  opacity?: "weak" | "medium" | "strong" | string | boolean;
}

declare const Image: React.FC<ImageProps & JSX.IntrinsicElements['img']>;

export { Image };
