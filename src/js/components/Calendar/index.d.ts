import * as React from "react";

export interface CalendarProps {
  bounds?: string[];
  date?: string;
  dates?: string | string[][];
  disabled?: string | string[][];
  firstDayOfWeek?: "0" | "1";
  locale?: string;
  onSelect?: (...args: any[]) => any;
  size?: "small" | "medium" | "large";
}

declare const Calendar: React.StatelessComponent<CalendarProps>;

export { Calendar };
