import * as React from "react";

export interface ClockProps {
  hourLimit?: "12" | "24" | "12" | "24";
  onChange?: (...args: any[]) => any;
  precision?: "hours" | "minutes" | "seconds";
  run?: boolean | "backward" | "forward";
  size?: "small" | "medium" | "large" | "xlarge" | string;
  time?: string;
  type?: "analog" | "digital";
}

declare const Clock: React.ComponentType<ClockProps>;

export { Clock };
