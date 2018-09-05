import * as React from "react";

export interface ChartProps {
  bounds?: number[][];
  color?: string | {color: string,opacity: "weak" | "medium" | "strong" | boolean};
  onClick?: (...args: any[]) => any;
  onHover?: (...args: any[]) => any;
  overflow?: boolean;
  round?: boolean;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | {height: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full",width: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full"};
  thickness?: "hair" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "none";
  type?: "bar" | "line" | "area";
  values: number | number[] | {label: string,onClick: (...args: any[]) => any,onHover: (...args: any[]) => any,value: number | number[]}[];
}

declare const Chart: React.StatelessComponent<ChartProps>;

export { Chart };
