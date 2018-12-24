import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
} from '../../types/common';

export interface DropButtonProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  disabled?: boolean;
  dropAlign?: {top?: 'top' | 'bottom', bottom?: 'top' | 'bottom', right?: 'left' | 'right', left?: 'left' | 'right'};
  dropContent: JSX.Element;
  dropTarget?: object;
  onClose?: AnyFunction;
  onOpen?: AnyFunction;
  open?: boolean;
}

declare const DropButton: React.ComponentType<DropButtonProps>;

export { DropButton };
