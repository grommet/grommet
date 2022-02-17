import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface PageSectionProps {
  full?: boolean;
}

export interface PageSectionExtendedProps extends PageSectionProps, BoxProps {}

declare const PageSection: React.FC<PageSectionExtendedProps>;

export { PageSection };
