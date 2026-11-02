// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { BoxExtendedProps } from '../Box';

export interface HeaderProps {
  sticky?: 'scrollup';
}

export interface HeaderExtendedProps extends BoxExtendedProps, HeaderProps {}

declare const Header: React.FC<HeaderExtendedProps>;

export { Header };
