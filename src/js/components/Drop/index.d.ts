import * as React from 'react';
import { AnyFunction } from '../../types/common';

export interface DropProps {
  align?: {top: 'top' | 'bottom', bottom: 'top' | 'bottom', right: 'left' | 'right', left: 'left' | 'right'};
  onClickOutside?: AnyFunction;
  onEsc?: AnyFunction;
  responsive?: boolean;
  restrictFocus?: boolean;
  stretch?: boolean;
  target: object;
  elevation?: 'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  plain?: boolean;
}

declare const Drop: React.ComponentType<DropProps>;

export { Drop };
