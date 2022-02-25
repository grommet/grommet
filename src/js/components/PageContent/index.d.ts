import * as React from 'react';
import { BoxProps } from '../Box/index';
import { ColorType } from '../../utils';

export interface PageContentProps {
  background?:
    | string
    | {
        color?: ColorType;
        dark?: boolean | string;
        image?: string;
        position?: string;
        opacity?: 'weak' | 'medium' | 'strong' | number | boolean;
        repeat?: 'no-repeat' | 'repeat' | string;
        size?: 'cover' | 'contain' | string;
        light?: string;
        fill?: 'horizontal';
      };
}

export interface PageContentExtendedProps
  extends PageContentProps,
    Omit<BoxProps, 'background'> {}

declare const PageContent: React.FC<PageContentExtendedProps>;

export { PageContent };
