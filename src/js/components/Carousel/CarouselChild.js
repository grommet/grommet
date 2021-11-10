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

      // If the child is not the current slide or the previous slide then it
      // does not need an animation and should remain hidden.
      if (index !== current && index !== previous) return;

      /**
       * If child is the new current slide of the Carousel set
       * display to block and determine the direction of the transition.
       * Depending on the direction apply the correct animation (RTL or LTR).
       *
       * If child is the previous slide of the Carousel set
       * display to none after the transition animation completes. Depending on
       * the direction apply the correct animation (RTL or LTR).
       */
      if (index === current) {
        setDisplay('block');
        if (direction === 'next') setAnimation(slideLeftCurrent);
        else setAnimation(slideRightCurrent);
      } else {
        setTimeout(() => {
          setDisplay('none');
          // Animation duration based on manual testing with designer
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
