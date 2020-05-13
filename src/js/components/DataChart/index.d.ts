import * as React from "react";
import { 
  A11yTitleType,
  ColorType, 
  GridAreaType, 
  MarginType, 
} from "../../utils";
import { ChartProps } from "../Chart";
import { GridProps } from "../Grid";

type ChartType = {
  key: string;
  ChartProps?;
}

export interface DataChartProps {
  a11yTitle?: A11yTitleType;
  chart: ChartType | ChartType[];
  data: {}[];
  gap?: GridProps["gap"];
  gridArea?: GridAreaType,
  margin?: MarginType;
  pad?: GridProps["pad"];
  steps?: number[][];
  thickness?: ChartProps["thickness"];
  xAxis?: boolean | { guide?: boolean, key?: string, render?: (index:number) => (void) };
  yAxis?: boolean | { guide?: boolean };
}

declare const DataChart: React.FC<DataChartProps>;

export { DataChart };
