import * as React from "react";

export interface CalendarProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
  animate?: boolean;
  bounds?: string[];
  date?: string;
  dates?: (string | string[])[];
  daysOfWeek?: boolean;
  disabled?: (string | string[])[];
  firstDayOfWeek?: "0" | "1";
  header?: ((...args: any[]) => any);
  locale?: string;
  onReference?: ((...args: any[]) => any);
  onSelect?: ((...args: any[]) => any);
  range?: boolean;
  reference?: string;
  showAdjacentDays?: boolean;
  size?: "small" | "medium" | "large" | string;
}

declare const Calendar: React.ComponentClass<CalendarProps & JSX.IntrinsicElements['div']>;

export { Calendar };
