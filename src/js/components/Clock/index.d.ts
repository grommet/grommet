import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin, GrommetSizeSToXL,
} from '../../types/common';

export interface ClockProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  hourLimit?: '12' | '24' | '12' | '24';
  onChange?: AnyFunction;
  precision?: 'hours' | 'minutes' | 'seconds';
  run?: boolean | 'backward' | 'forward';
  size?: GrommetSizeSToXL | string;
  time?: string;
  type?: 'analog' | 'digital';
}

declare const Clock: React.ComponentType<ClockProps>;

export { Clock };
