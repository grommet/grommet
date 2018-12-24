import * as React from 'react';
import {
  AnyFunction,
  GrommetAlignSelfOrJustify,
  GrommetMargin,
} from '../../types/common';

export interface TabsProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  activeIndex?: number;
  children: React.ReactNode;
  flex?: 'grow' | 'shrink' | boolean;
  justify?: 'start' | 'center' | 'end';
  messages?: {tabContents?: string};
  onActive?: AnyFunction;
}

declare const Tabs: React.ComponentType<TabsProps>;

export { Tabs };
