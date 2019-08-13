import * as React from "react";
import { A11yTitleType, AlignSelfType, GridAreaType, MarginType, CarouselControlsType } from "../../utils";

export interface CarouselProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  controls?: CarouselControlsType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
}

declare const Carousel: React.ComponentClass<CarouselProps & JSX.IntrinsicElements['div']>;

export { Carousel };
