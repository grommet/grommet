import * as React from "react";

export interface CarouselProps {
  fill: boolean;
  play: number;
}

declare const Carousel: React.ComponentType<CarouselProps>;

export { Carousel };
