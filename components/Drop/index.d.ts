import * as React from 'react';
import { KeyboardType } from '../../utils';
import { BoxProps } from '../Box';

export interface DropProps extends Omit<BoxProps, 'align'> {
  align?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  inline?: boolean;
  onClickOutside?: React.MouseEventHandler<HTMLDocument>;
  onEsc?: KeyboardType;
  restrictFocus?: boolean;
  stretch?: boolean | 'align';
  target?: object;
  trapFocus?: boolean;
  plain?: boolean;
}

type divProps = Omit<JSX.IntrinsicElements['div'], keyof DropProps>;

export interface DropExtendedProps extends DropProps, divProps {}

// Keep type alias for backwards compatibility.
export type DropType = DropProps & JSX.IntrinsicElements['div'];

declare const Drop: React.FC<DropExtendedProps>;

export { Drop };
