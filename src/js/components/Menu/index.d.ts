import * as React from 'react';
import {
  GrommetAlignSelfOrJustify,
  GrommetMargin,
  GrommetSizeSToXL,
} from '../../types/common';

export interface MenuProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  disabled?: boolean;
  dropAlign?: {top?: 'top' | 'bottom', bottom?: 'top' | 'bottom', left?: 'right' | 'left', right?: 'right' | 'left'};
  dropBackground?: string | {color?: string, opacity?: 'weak' | 'medium' | 'strong' | boolean};
  dropTarget?: object;
  icon?: boolean | React.ReactNode;
  items: object[];
  label?: string | React.ReactNode;
  messages?: {closeMenu?: string, openMenu?: string};
  size?: GrommetSizeSToXL | string;
}

declare const Menu: React.ComponentType<MenuProps>;

export { Menu };
