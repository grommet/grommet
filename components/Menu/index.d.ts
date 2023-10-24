import * as React from 'react';
import { DropType } from '../Drop';
import { ButtonExtendedProps, ButtonType } from '../Button';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  JustifyContentType,
  MarginType,
  Omit,
} from '../../utils';

export interface MenuProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  children?: Function | React.ReactNode;
  disabled?: boolean;
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    left?: 'right' | 'left';
    right?: 'right' | 'left';
  };
  dropBackground?:
    | string
    | {
        color?: string;
        opacity?: 'weak' | 'medium' | 'strong' | boolean | number;
      };
  dropTarget?: object;
  dropProps?: DropType;
  gridArea?: GridAreaType;
  icon?: boolean | React.ReactNode;
  items: ButtonExtendedProps[] | ButtonExtendedProps[][];
  justifyContent?: JustifyContentType;
  label?: string | React.ReactNode;
  margin?: MarginType;
  messages?: { closeMenu?: string; openMenu?: string };
  open?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
}

export interface MenuExtendedProps
  extends MenuProps,
    Omit<ButtonType, 'icon' | 'size' | 'children'> {}

declare const Menu: React.FC<MenuExtendedProps>;

export { Menu };
