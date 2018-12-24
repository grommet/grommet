import * as React from 'react';
import { AnyFunction, GrommetMargin, GrommetAlignSelfOrJustify } from '../../types/common';

export interface CalendarProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  animate?: boolean;
  bounds?: string[];
  date?: string;
  dates?: string | string[][];
  disabled?: string | string[][];
  firstDayOfWeek?: '0' | '1';
  header?: AnyFunction;
  locale?: string;
  onReference?: AnyFunction;
  onSelect?: AnyFunction;
  range?: boolean;
  reference?: string;
  showAdjacentDays?: boolean;
  size?: 'small' | 'medium' | 'large' | string;
}

declare const Calendar: React.ComponentType<CalendarProps>;

export { Calendar };
