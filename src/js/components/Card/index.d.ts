import * as React from 'react';
import { BoxProps } from '../Box'; 

export interface CardProps {
    footer?:  React.ReactNode;
    header?: React.ReactNode;
  }

declare const Card: React.FC<BoxProps & CardProps & JSX.IntrinsicElements['div']>;

export { Card };
