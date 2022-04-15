import * as React from 'react';
import { BoxExtendedProps } from '../Box';

export interface HeaderProps {
  sticky?: 'scrollup';
}

export interface HeaderExtendedProps extends BoxTypes, HeaderProps {}

declare const Header: React.FC<HeaderExtendedProps>;

export { Header };
