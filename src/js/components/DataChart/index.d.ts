import * as React from "react";
import { 
  A11yTitleType,
  AlignSelfType,
  BackgroundType,
  GapType,
  GridAreaType, 
  MarginType, 
} from "../../utils";
import { ChartProps, OpacityType, ChartTypes } from "../Chart";
import { GridProps } from "../Grid";

type ChartType = {
  key: string;
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  bounds?: number[];
  color?: string | {color?: string, opacity?: OpacityType | boolean} | {color: string, value: number | number[]}[];
  gap?: GapType;
  onClick?: ((...args: any[]) => any);
  onHover?: ((...args: any[]) => any);
  overflow?: boolean;
  round?: boolean;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | {height?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string, width?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string} | string;
  thickness?: "hair" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "none" | string;
  type?: ChartTypes;
}

export interface DataChartProps {
  a11yTitle?: A11yTitleType;
  chart: ChartType | ChartType[];
  data: {}[];
  gap?: GridProps["gap"];
  gridArea?: GridAreaType,
  margin?: MarginType;
  pad?: GridProps["pad"];
  steps?: [number, number];
  thickness?: ChartProps["thickness"];
  xAxis?: boolean | { guide?: boolean, background?: BackgroundType, key?: string, render?: (index:number) => void };
  yAxis?: boolean | { guide?: boolean };
}

declare const DataChart: React.FC<DataChartProps>;

export { DataChart };
