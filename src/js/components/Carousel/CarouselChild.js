import React, { useState, useEffect, forwardRef } from 'react';
import {
  slideLeftCurrent,
  slideLeftPrevious,
  slideRightCurrent,
  slideRightPrevious,
  StyledCarouselChild,
} from './StyledCarousel';
import { CarouselChildPropTypes } from './propTypes';

const CarouselChild = forwardRef(
  ({ children, index, current, previous, direction }, ref) => {
    const [animation, setAnimation] = useState(undefined);
    const [display, setDisplay] = useState(
      current === index ? 'block' : 'none',
    );

    useEffect(() => {
      // Previous is only undefined on initialization. This tells the component:
      // on mount, do not render the first slide with an animation.
      if (previous === undefined) return;
      if (index !== current && index !== previous) return;

      if (index === current) {
        setDisplay('block');
        if (direction === 'next') setAnimation(slideLeftCurrent);
        else setAnimation(slideRightCurrent);
      } else {
        setTimeout(() => {
          setDisplay('none');
        }, 600);
        if (direction === 'next') setAnimation(slideLeftPrevious);
        else setAnimation(slideRightPrevious);
      }
    }, [current, direction, index, previous]);

    return (
      <StyledCarouselChild
        animation={animation}
        displayProp={display}
        ref={ref}
      >
        {children}
      </StyledCarouselChild>
    );
  },
);

CarouselChild.propTypes = CarouselChildPropTypes;

export { CarouselChild };
