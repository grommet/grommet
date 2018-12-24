import * as React from 'react';
import { GrommetAlignSelfOrJustify, GrommetMargin } from '../../types/common';

export interface StackProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  fill?: boolean;
  guidingChild?: number | 'first' | 'last';
}

declare const Stack: React.ComponentType<StackProps>;

export { Stack };
