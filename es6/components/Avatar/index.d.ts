import * as React from 'react';
import { BoxProps } from '../Box/index';
import { ImageExtendedProps } from '../Image';

export interface AvatarProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  src?: string;
  imageProps?: ImageExtendedProps;
}

export interface AvatarExtendedProps
  extends BoxProps,
    AvatarProps,
    Omit<JSX.IntrinsicElements['div'], 'onClick'> {}

declare const Avatar: React.FC<AvatarExtendedProps>;

export { Avatar };
