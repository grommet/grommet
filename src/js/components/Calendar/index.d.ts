import * as React from "react";
import { AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface CalendarProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
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
