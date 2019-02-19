import * as React from "react";

export interface ChartProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  bounds?: number[][];
  color?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean};
  onClick?: ((...args: any[]) => any);
  onHover?: ((...args: any[]) => any);
  overflow?: boolean;
  round?: boolean;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | {height?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string,width?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string} | string;
  thickness?: "hair" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "none" | string;
  type?: "bar" | "line" | "area";
  values: (number | number[] | {label?: string,onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any),value: number | number[]})[];
}

declare const Chart: React.ComponentClass<ChartProps>;

export { Chart };
