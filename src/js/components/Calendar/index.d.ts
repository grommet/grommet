import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  AnimateType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface CalendarProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  activeDate?: 'start' | 'end';
  animate?: AnimateType;
  bounds?: string[];
  children?: (...args: any[]) => any;
  date?: string;
  dates?: (string | string[])[];
  daysOfWeek?: boolean;
  disabled?: (string | string[])[];
  fill?: boolean;
  firstDayOfWeek?: 0 | 1;
  header?: (...args: any[]) => any;
  locale?: string;
  onReference?: (reference: string) => void;
  onSelect?: (select: string | string[]) => any;
  range?: boolean | 'array';
  reference?: string;
  showAdjacentDays?: boolean | 'trim';
  size?: 'small' | 'medium' | 'large' | string;
}

declare const Calendar: React.ComponentClass<CalendarProps &
  JSX.IntrinsicElements['div']>;
export type CalendarType = CalendarProps &
  Omit<JSX.IntrinsicElements['div'], 'onSelect'>;

export { Calendar };
