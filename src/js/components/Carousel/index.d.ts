import * as React from "react";
import { AlignSelfType, GridAreaType, MarginType } from "../../utils";

export interface CarouselProps {
  a11yTitle?: string;
  alignSelf?: AlignSelfType;
  gridArea?: GridAreaType;
  margin?: MarginType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
}

declare const Carousel: React.ComponentClass<CarouselProps & JSX.IntrinsicElements['div']>;

export { Carousel };
