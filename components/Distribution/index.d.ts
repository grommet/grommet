import * as React from "react";

export interface DistributionProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  children?: (...args: any[]) => any;
  fill?: boolean;
  gap?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  values: {value: number}[];
}

declare const Distribution: React.ComponentType<DistributionProps>;

export { Distribution };
