import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface PageProps {
  kind?: 'wide' | 'narrow' | 'full' | string;
}

export interface PageExtendedProps extends PageProps, BoxProps {}

declare const Page: React.FC<PageExtendedProps>;

export { Page };
