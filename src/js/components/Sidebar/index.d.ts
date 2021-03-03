import * as React from 'react';
import { BoxProps } from '../Box';

export interface SidebarProps {
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface SidebarExtendedProps
  extends BoxProps,
    SidebarProps,
    divProps {}

declare const Sidebar: React.FC<SidebarExtendedProps>;

export { Sidebar };
