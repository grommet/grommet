import * as React from 'react';
import { BoxProps } from '../Box';

export interface SidebarProps {
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

export type SidebarExtendedProps = BoxProps &
  SidebarProps &
  JSX.IntrinsicElements['div'];

declare const Sidebar: React.FC<SidebarExtendedProps>;

export { Sidebar };
