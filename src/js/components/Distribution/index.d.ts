import * as React from "react";

export interface DistributionProps {
  children?: (...args: any[]) => any;
  gap?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  values: {value: number}[];
}

declare const Distribution: React.ComponentType<DistributionProps>;

export { Distribution };
