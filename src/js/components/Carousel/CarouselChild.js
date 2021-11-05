import React, { useState, forwardRef, useEffect } from 'react';
import {
  StyledCarouselChild,
  slideLeftCurrent,
  slideLeftPrevious,
  slideRightCurrent,
  slideRightPrevious,
} from './StyledCarousel';
import { CarouselChildPropTypes } from './propTypes';

const handleAnimation =
  ({ setAnimation, setVisibility }) =>
  (animation, visibility) => {
    setAnimation(animation);
    const timer = setTimeout(() => {
      setVisibility(visibility);
    }, 100);
    return () => clearTimeout(timer);
  };

const CarouselChild = forwardRef(
  (
    { children, index, current, noContainer, previous, direction, absolute },
    ref,
  ) => {
    const [animation, setAnimation] = useState(undefined);
    const [visibility, setVisibility] = useState(
      current === index ? 'visible' : 'hidden',
    );

    const onAnimation = handleAnimation({
      setAnimation,
      setVisibility,
    });

    useEffect(() => {
      // Previous is only undefined on mount. This tells the component:
      // On mount, do not render the first slide with an animation.
      if (previous === undefined) return;
      if (index !== current && index !== previous) setAnimation(undefined);

      if (index === current) {
        if (direction === 'next') onAnimation(slideLeftCurrent, 'visible');
        else onAnimation(slideRightCurrent, 'visible');
      } else if (index === previous) {
        if (direction === 'next') onAnimation(slideLeftPrevious, 'hidden');
        else onAnimation(slideRightPrevious, 'hidden');
      }
    }, [onAnimation, direction, index, current, previous]);

    return (
      <StyledCarouselChild
        ref={ref}
        visibility={visibility}
        noContainer={noContainer}
        absolute={absolute}
        animation={animation}
      >
        {children}
      </StyledCarouselChild>
    );
  },
);

CarouselChild.propTypes = CarouselChildPropTypes;

export { CarouselChild };
