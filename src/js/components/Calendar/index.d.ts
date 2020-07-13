import * as React from "react";
import { A11yTitleType, AlignSelfType, AnimateType, GridAreaType, MarginType } from "../../utils";

export interface CalendarProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  animate?: AnimateType
  bounds?: string[];
  date?: string;
  dates?: (string | string[])[];
  daysOfWeek?: boolean;
  disabled?: (string | string[])[];
  firstDayOfWeek?: 0 | 1;
  header?: ((...args: any[]) => any);
  locale?: string;
  onReference?: ((reference: string) => void);
  onSelect?: ((select: string | string[]) => any);
  range?: boolean;
  reference?: string;
  showAdjacentDays?: boolean;
  size?: "small" | "medium" | "large" | string;
}

declare const Calendar: React.ComponentClass<CalendarProps & JSX.IntrinsicElements['div']>;
export type CalendarType = CalendarProps & Omit<JSX.IntrinsicElements['div'], 'onSelect'>;

export { Calendar };
