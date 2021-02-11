import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface CarouselProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  controls?: boolean | 'arrows' | 'selectors';
  gridArea?: GridAreaType;
  margin?: MarginType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
  onChild?: (...args: any[]) => void;
}

declare const Carousel: React.ComponentClass<CarouselProps &
  JSX.IntrinsicElements['div']>;

export { Carousel };
