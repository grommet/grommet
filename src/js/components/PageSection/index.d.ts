import * as React from 'react';
import { BoxProps } from '../Box/index';
import { BackgroundType } from '../../utils';

export interface PageSectionProps {
  fullBackground?: BackgroundType;
}

export interface PageSectionExtendedProps extends PageSectionProps, BoxProps {}

declare const PageSection: React.FC<PageSectionExtendedProps>;

export { PageSection };
