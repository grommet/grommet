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

export type CarouselExtendedProps = CarouselProps &
  JSX.IntrinsicElements['div'];

declare const Carousel: React.FC<CarouselExtendedProps>;

export { Carousel };
