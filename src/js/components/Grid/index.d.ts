import * as React from "react";

export interface GridProps {
  align?: "start" | "center" | "end" | "stretch";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  areas?: {name: string,start: number[],end: number[]}[];
  columns?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "flex" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "flex"[][] | "xsmall" | "small" | "medium" | "large" | "xlarge" | {count: "fit" | "fill",size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "flex"[]};
  fill?: "horizontal" | "vertical" | "true" | "false";
  gap?: "small" | "medium" | "large" | "none" | {row: "small" | "medium" | "large" | "none",column: "small" | "medium" | "large" | "none"};
  justify?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  rows?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "flex" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4" | "flex"[][] | "xsmall" | "small" | "medium" | "large" | "xlarge";
  tag?: string;
}

declare const Grid: React.ComponentType<GridProps>;

export { Grid };
