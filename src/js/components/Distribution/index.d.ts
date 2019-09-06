import * as React from "react";
import { A11yTitleType, AlignSelfType, GapType, GridAreaType, MarginType } from "../../utils";

export interface DistributionProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  children?: ((...args: any[]) => any);
  fill?: boolean;
  gap?: GapType;
  values: {value: number, color?: string | {dark?: string,light?: string}}[];
}

declare const Distribution: React.ComponentClass<DistributionProps & JSX.IntrinsicElements['div']>;

export { Distribution };
