import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface ClockProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  hourLimit?: '12' | '24' | '12' | '24';
  onChange?: (time: string) => void;
  precision?: 'hours' | 'minutes' | 'seconds';
  run?: boolean | 'backward' | 'forward';
  size?:
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge'
    | 'huge'
    | string;
  time?: string;
  type?: 'analog' | 'digital';
}

declare const Clock: React.ComponentClass<ClockProps &
  (JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['svg'])>;

export { Clock };
