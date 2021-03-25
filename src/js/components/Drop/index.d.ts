import * as React from 'react';
import {
  BackgroundType,
  ElevationType,
  KeyboardType,
  MarginType,
  RoundType,
} from '../../utils';

export interface DropProps {
  align?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  background?: BackgroundType;
  elevation?: ElevationType;
  onClickOutside?: React.MouseEventHandler<HTMLDocument>;
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
  stretch?: boolean | 'align';
  target?: object;
  trapFocus?: boolean;
  plain?: boolean;
  margin?: MarginType;
  round?: RoundType;
}

type divProps = JSX.IntrinsicElements['div'];

export interface DropExtendedProps extends DropProps, divProps {}

// Keep type alias for backwards compatibility.
export type DropType = DropProps & JSX.IntrinsicElements['div'];

declare const Drop: React.FC<DropExtendedProps>;

export { Drop };
