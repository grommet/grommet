import * as React from "react";
import { MarginType } from "../../utils";

export interface DistributionProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: MarginType;
  children?: ((...args: any[]) => any);
  fill?: boolean;
  gap?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  values: {value: number, color?: string | {dark?: string,light?: string}}[];
}

declare const Distribution: React.ComponentClass<DistributionProps & JSX.IntrinsicElements['div']>;

export { Distribution };
