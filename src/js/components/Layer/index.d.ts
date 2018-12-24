import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface LayerProps {
  animate?: boolean;
  full?: boolean | 'vertical' | 'horizontal';
  margin?: 'none' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | {bottom?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string, horizontal?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string, left?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string, right?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string, top?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string, vertical?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | string} | string;
  modal?: boolean;
  onClickOutside?: AnyFunction;
  onEsc?: AnyFunction;
  plain?: boolean;
  position?: 'bottom' | 'bottom-left' | 'bottom-right' | 'center' | 'hidden' | 'left' | 'right' | 'top' | 'top-left' | 'top-right';
  responsive?: boolean;
}

declare const Layer: React.ComponentType<LayerProps>;

export { Layer };
