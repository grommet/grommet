import * as React from "react";
import { MarginType } from "../../utils";

export interface CarouselProps {
  a11yTitle?: string;
  alignSelf?: "start" | "center" | "end" | "stretch";
  gridArea?: string;
  margin?: MarginType;
  fill?: boolean;
  play?: number;
  initialChild?: number;
}

declare const Carousel: React.ComponentClass<CarouselProps & JSX.IntrinsicElements['div']>;

export { Carousel };
