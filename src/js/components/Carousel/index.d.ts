import * as React from "react";

export interface CarouselProps {
  fill?: boolean;
  play?: number;
}

declare const Carousel: React.StatelessComponent<CarouselProps>;

export { Carousel };
