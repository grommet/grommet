import * as React from "react";

export interface ClockProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  hourLimit?: "12" | "24" | "12" | "24";
  onChange?: ((...args: any[]) => any);
  precision?: "hours" | "minutes" | "seconds";
  run?: boolean | "backward" | "forward";
  size?: "small" | "medium" | "large" | "xlarge" | string;
  time?: string;
  type?: "analog" | "digital";
}

declare const Clock: React.ComponentClass<ClockProps & (JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['svg'])>;

export { Clock };
