import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface MeterProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  background?: string | {color?: string,opacity?: "weak" | "medium" | "strong" | boolean};
  gridArea?: GridAreaType;
  margin?: MarginType;
  round?: boolean;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string;
  thickness?: "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
  type?: "bar" | "circle";
  values?: {color?: string,highlight?: boolean,label: string,onClick?: ((...args: any[]) => any),onHover?: ((...args: any[]) => any),value: number}[];
}

declare const Meter: React.ComponentClass<MeterProps>;

export { Meter };
