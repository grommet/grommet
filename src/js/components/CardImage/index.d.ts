import * as React from 'react';
import { BoxTypes } from '../Box/index';

export interface CardImageExtendedProps {
  src?: string;
  alt?: string;
  a11yTitle?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fill?: boolean | 'horizontal' | 'vertical';
  fallback?: string;
  onError?: (event: React.SyntheticEvent) => void;
  onLoad?: (event: React.SyntheticEvent) => void;
  opacity?: boolean | string | 'weak' | 'medium' | 'strong';
}

export interface CardImageProps extends BoxTypes, CardImageExtendedProps {}

declare const CardImage: React.FC<CardImageProps>;

export { CardImage };
