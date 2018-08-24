import * as React from "react";

export interface MeterProps {
  background?: string | {color: string,opacity: "weak" | "medium" | "strong" | boolean};
  round?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full";
  thickness?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  type?: "bar" | "circle";
  values?: {color: string,highlight: boolean,label: string,onClick: (...args: any[]) => any,onHover: (...args: any[]) => any,value: number}[];
}

declare const Meter: React.ComponentType<MeterProps>;

export { Meter };
