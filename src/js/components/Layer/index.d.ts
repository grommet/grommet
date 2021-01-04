import * as React from 'react';
import { AnimateType, MarginType, KeyboardType } from '../../utils';

export type LayerPositionType =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'hidden'
  | 'left'
  | 'right'
  | 'top'
  | 'top-left'
  | 'top-right';
export interface LayerProps {
  animate?: AnimateType;
  animation?: 'none' | 'slide' | 'fadeIn' | boolean;
  full?: boolean | 'vertical' | 'horizontal';
  margin?: MarginType;
  modal?: boolean;
  onClickOutside?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onEsc?: KeyboardType;
  plain?: boolean;
  position?: LayerPositionType;
  responsive?: boolean;
  target?: object;
}

declare const Layer: React.ComponentClass<LayerProps &
  JSX.IntrinsicElements['div']>;

export { Layer };
