import * as React from "react";

export interface CalendarProps {
  animate?: boolean;
  bounds?: string[];
  date?: string;
  dates?: string | string[][];
  disabled?: string | string[][];
  firstDayOfWeek?: "0" | "1";
  header?: (...args: any[]) => any;
  locale?: string;
  onReference?: (...args: any[]) => any;
  onSelect?: (...args: any[]) => any;
  reference?: string;
  showAdjacentDays?: boolean;
  size?: "small" | "medium" | "large" | string;
}

declare const Calendar: React.ComponentType<CalendarProps>;

export { Calendar };
