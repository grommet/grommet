import * as React from 'react';
import { GrommetAlignSelfOrJustify, GrommetMargin } from '../../types/common';

export interface CarouselProps {
  a11yTitle?: string;
  alignSelf?: GrommetAlignSelfOrJustify;
  gridArea?: string;
  margin?: GrommetMargin;
  fill?: boolean;
  play?: number;
}

declare const Carousel: React.ComponentType<CarouselProps>;

export { Carousel };
