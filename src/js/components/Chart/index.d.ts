import * as React from "react";
import {
  A11yTitleType,
  AlignSelfType,
  GapType,
  GridAreaType,
  MarginType,
} from "../../utils";

export type OpacityType = "weak" | "medium" | "strong";
export type ChartTypes = "bar" | "line" | "area" | "point";

export interface ChartProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  bounds?: [number, number];
  color?: string | {color?: string, opacity?: OpacityType | boolean} | {color: string, value: number | number[]}[];
  gap?: GapType;
  onClick?: ((...args: any[]) => any);
  onHover?: ((...args: any[]) => any);
  overflow?: boolean;
  round?: boolean;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | {height?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string, width?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string} | string;
  thickness?: "hair" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "none" | string;
  type?: ChartTypes;
  values: (number | number[] | {label?: string,onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any),value: number | number[]})[];
}

declare const Chart: React.ComponentClass<ChartProps>;

export { Chart };
