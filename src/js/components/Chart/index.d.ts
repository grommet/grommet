import * as React from "react";
import {
  A11yTitleType,
  AlignSelfType,
  EdgeSizeType,
  GapType,
  GridAreaType,
  MarginType,
} from "../../utils";

export interface ChartProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  bounds?: number[][];
  color?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean} | {color: string, value: number | number[]}[];
  dash?: boolean;
  gap?: GapType;
  onClick?: ((...args: any[]) => any);
  onHover?: ((...args: any[]) => any);
  overflow?: boolean;
  pad?: EdgeSizeType | { horizontal?: EdgeSizeType, vertical?: EdgeSizeType };
  round?: boolean;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "fill" | "full" | {height?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "fill" | "full" | string,width?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "fill" | "full" | string} | string;
  thickness?: "hair" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "none" | string;
  type?: "bar" | "line" | "area" | "point";
  values: (number | number[] | {label?: string,onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any),value: number | number[]})[];
}

declare const Chart: React.ComponentClass<ChartProps>;

export { Chart };
