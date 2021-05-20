import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  GridAreaType,
  MarginType,
} from '../../utils';

export interface CarouselProps {
  a11yTitle?: A11yTitleType;
  activeIndex?: number;
  alignSelf?: AlignSelfType;
  controls?: boolean | 'arrows' | 'selectors';
  gridArea?: GridAreaType;
  margin?: MarginType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
  onChild?: (...args: any[]) => void;
}

type divType = JSX.IntrinsicElements['div'];

export interface CarouselExtendedProps extends CarouselProps, divType {}

declare const Carousel: React.FC<CarouselExtendedProps>;

export { Carousel };
