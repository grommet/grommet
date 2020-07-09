import * as React from "react";
import { 
  A11yTitleType,
  GapType,
  GridAreaType,
  MarginType,
} from "../../utils";
import { ChartProps } from "../Chart";
import { GridProps } from "../Grid";

type ChartType = string | {
  property: string | string[]; // property to get values from objects in data 
  dash?: ChartProps["dash"]; // defaults to undefined
  round?: ChartProps["round"]; // defaults to undefined
  thickness?: ChartProps["thickness"]; // defaults to auto assigned based on available space and amount of data
  type?: ChartProps["type"]; // defaults to 'bar'
}

type PropertyType = string | {
  bounds?: number[]; // defaults to largest and smallest data values
  color?: string;    // defaults to auto-assigned sequentially
  label?: string | React.ReactNode; // used for legend and/or hover/touch detail
  point?: ChartProps["point"];
  prefix?: string;   // used for values in axes and hover/touch detail
  property: string;  // property key to get values from objects in data
  render?: ((value: any, datum: {}, property: string) => React.ReactNode); // used for hover/touch detail
  suffix?: string;   // used for values in axes and hover/touch detail
}

type GranularityType = 'coarse' | 'medium' | 'fine'

export interface DataChartProps {
  a11yTitle?: A11yTitleType;
  // axis - when true, {
  //   x: { property: 'date' <if any>, granularity: 'coarse' },
  //   y: { property: property[0].property, granularity: 'coarse' },
  // }
  axis?: boolean | { x?: string | { property?: string, granularity?: GranularityType }, y?: string | { property?: string, granularity?: GranularityType } };
  // chart - if undefined, { type: 'bar', property: <first property> }
  chart?: ChartType | ChartType[];
  // data - an array of objects containing data values
  data: {}[];
  // detail - whether to show details via hover/touch interaction
  detail?: boolean | ((datum: {}, index: number) => React.ReactNode),
  gap?: GridProps["gap"];   // between axes and guides/visuals
  gridArea?: GridAreaType;  // generic
  // guide - when true, {
  //   x: { property: axis.x.property <if any>, granularity: 'coarse' },
  //   y: { property: axis.y.property || property[0].property, granularity: 'coarse' },
  // }
  guide?: boolean | { x?: boolean | { granularity?: GranularityType, property?: string }, y?: boolean | { granularity?: GranularityType, property?: string } };
  // legend - when true, { side: 'bottom' }
  legend?: boolean | { side: 'left' | 'right' | 'bottom' };
  // pad - padding around the guides/visuals
  // defaults to what's needed based on axis and chart types
  pad?: GridProps["pad"];
  // property - for richer axis and detail
  property: PropertyType | PropertyType[];
  margin?: MarginType;      // generic
  size?: ChartProps["size"]; // width and height, defaults to 'fill'
}





// type ChartType = {
//   key?: string;
//   keys?: { key: string, color?: ChartProps["color"] }[];
//   a11yTitle?: A11yTitleType;
//   bounds?: ChartProps["bounds"];
//   color?: ChartProps["color"];
//   dash?: ChartProps["dash"];
//   overflow?: ChartProps["overflow"];
//   round?: ChartProps["round"];
//   thickness?: ChartProps["thickness"];
//   type?: ChartProps["type"];
// }

// export interface DataChartProps {
//   a11yTitle?: A11yTitleType;
//   chart: ChartType | ChartType[];
//   data: {}[];
//   gap?: GridProps["gap"];
//   gridArea?: GridAreaType,
//   hover?: boolean,
//   margin?: MarginType;
//   pad?: GridProps["pad"];
//   size?: ChartProps["size"];
//   thickness?: ChartProps["thickness"];
//   xAxis?: boolean | { guide?: boolean, key?: string, labels?: number, render?: (dataIndex: number, axisIndex: number) => (void) };
//   yAxis?: boolean | { guide?: boolean, labels?: number, prefix?: string, render?: (value:any, data:{}[], dataIndex: number, axisIndex: number) => (void), suffix?: string };
// }

declare const DataChart: React.FC<DataChartProps>;

export { DataChart };
