import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface TabsProps {
  a11yTitle?: A11yTitleType;
  activeIndex?: number;
  alignSelf?: AlignSelfType;
  alignControls?: AlignSelfType;
  children: React.ReactNode;
  flex?: 'grow' | 'shrink' | boolean;
  gridArea?: GridAreaType;
  justify?: 'start' | 'center' | 'end';
  margin?: MarginType;
  messages?: { tabContents?: string };
  onActive?: (index: number) => void;
}

declare const Tabs: React.FC<TabsProps & JSX.IntrinsicElements['div']>;

export { Tabs };
