import * as React from "react";
import { PolymorphicType } from "../../utils";

export interface GridProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  align?: "start" | "center" | "end" | "stretch";
  alignContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  areas?: {name?: string,start?: number[],end?: number[]}[];
  columns?: ("xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "flex" | "auto" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | string | string[])[] | "xsmall" | "small" | "medium" | "large" | "xlarge" | {count?: "fit" | "fill" | number,size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "flex" | "auto" | string | string[]} | string;
  fill?: "horizontal" | "vertical" | boolean;
  gap?: "small" | "medium" | "large" | "none" | {row?: "small" | "medium" | "large" | "none" | string,column?: "small" | "medium" | "large" | "none" | string} | string;
  justify?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "stretch";
  rows?: ("xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "flex" | "auto" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | string | string[])[] | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  tag?: PolymorphicType;
  as?: PolymorphicType;
}

declare const Grid: React.FC<GridProps & JSX.IntrinsicElements['div']>;

export { Grid };
