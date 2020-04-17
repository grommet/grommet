import * as React from 'react';
import { BoxProps } from '../Box'; 


export interface SidebarProps {
    footer?:  React.ReactNode;
    header?: React.ReactNode;
  }

declare const Sidebar: React.FC<BoxProps & SidebarProps & JSX.IntrinsicElements['div']>;

export { Sidebar };
