import * as React from 'react';
import { ElevationType, KeyboardType } from '../../utils';

export interface DropProps {
  align?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  elevation?: ElevationType;
  onClickOutside?: (...args: any[]) => any;
  onEsc?: KeyboardType;
  overflow?:
    | 'auto'
    | 'hidden'
    | 'scroll'
    | 'visible'
    | {
        horizontal?: 'auto' | 'hidden' | 'scroll' | 'visible';
        vertical?: 'auto' | 'hidden' | 'scroll' | 'visible';
      }
    | string;
  responsive?: boolean;
  restrictFocus?: boolean;
  stretch?: boolean;
  target?: object;
  trapFocus?: boolean;
  plain?: boolean;
}

declare const Drop: React.ComponentClass<DropProps &
  JSX.IntrinsicElements['div']>;
export type DropType = DropProps & JSX.IntrinsicElements['div'];

export { Drop };
