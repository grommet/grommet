import * as React from 'react';
import { BoxProps } from '../Box'; 


export interface AvatarProps {
    email?: string;
    size?: BoxProps['height'];
    src?: string | React.ReactNode;
  }

declare const Avatar: React.FC<BoxProps & AvatarProps>;

export { Avatar };
