// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { BoxExtendedProps } from '../Box/index';

export interface PageProps {
  kind?: 'wide' | 'narrow' | 'full' | string;
}

export interface PageExtendedProps extends PageProps, BoxExtendedProps {}

declare const Page: React.FC<PageExtendedProps>;

export { Page };
