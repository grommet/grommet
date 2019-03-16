import * as React from "react";
import { Omit } from "../../utils";

export interface RangeSelectorProps {
  color?: string | {dark?: string,light?: string};
  direction?: "horizontal" | "vertical";
  invert?: boolean;
  max?: number;
  messages?: {lower?: string,upper?: string};
  min?: number;
  onChange?: ((...args: any[]) => any);
  opacity?: "weak" | "medium" | "strong" | string | boolean;
  round?: "xsmall" | "small" | "medium" | "large" | "full" | string;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "full" | string;
  step?: number;
  values: number[];
}

declare const RangeSelector: React.ComponentClass<RangeSelectorProps & Omit<JSX.IntrinsicElements['div'], 'color'>>;

export { RangeSelector };
