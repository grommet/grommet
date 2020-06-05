import * as React from "react";
import { 
  A11yTitleType,
  GapType,
  GridAreaType,
  MarginType,
} from "../../utils";
import { ChartProps } from "../Chart";
import { GridProps } from "../Grid";

type ChartType = {
  key?: string;
  keys?: { key: string, color?: ChartProps["color"] }[];
  a11yTitle?: A11yTitleType;
  bounds?: ChartProps["bounds"];
  color?: ChartProps["color"];
  dash?: ChartProps["dash"];
  onClick?: ChartProps["onClick"];
  onHover?: ChartProps["onHover"];
  overflow?: ChartProps["overflow"];
  round?: ChartProps["round"];
  thickness?: ChartProps["thickness"];
  type?: ChartProps["type"];
}

export interface DataChartProps {
  a11yTitle?: A11yTitleType;
  chart: ChartType | ChartType[];
  data: {}[];
  gap?: GridProps["gap"];
  gridArea?: GridAreaType,
  margin?: MarginType;
  pad?: GridProps["pad"];
  size?: ChartProps["size"];
  thickness?: ChartProps["thickness"];
  xAxis?: boolean | { guide?: boolean, key?: string, labels?: number, render?: (dataIndex: number, axisIndex: number) => (void) };
  yAxis?: boolean | { guide?: boolean, labels?: number, prefix?: string, render?: (value:any, data:{}[], dataIndex: number, axisIndex: number) => (void), suffix?: string };
}

declare const DataChart: React.FC<DataChartProps>;

export { DataChart };
