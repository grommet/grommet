import * as React from "react";
import { A11yTitleType, AlignSelfType, MarginType } from "../../utils";

export interface DistributionProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  children?: ((...args: any[]) => any);
  fill?: boolean;
  gap?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  values: {value: number, color?: string | {dark?: string,light?: string}}[];
}

declare const Distribution: React.ComponentClass<DistributionProps & JSX.IntrinsicElements['div']>;

export { Distribution };
