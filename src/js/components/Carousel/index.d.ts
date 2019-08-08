import * as React from "react";
import { A11yTitleType, AlignSelfType, MarginType } from "../../utils";

export interface CarouselProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  gridArea?: string;
  margin?: MarginType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
}

declare const Carousel: React.ComponentClass<CarouselProps & JSX.IntrinsicElements['div']>;

export { Carousel };
