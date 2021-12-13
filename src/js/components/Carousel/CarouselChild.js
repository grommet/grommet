import React, { useState, useEffect } from 'react';
import {
  slideLeftCurrent,
  slideLeftPrevious,
  slideRightCurrent,
  slideRightPrevious,
  StyledCarouselChild,
} from './StyledCarousel';
import { CarouselChildPropTypes } from './propTypes';

const CarouselChild = ({
  animationDuration,
  noDimensions,
  children,
  index,
  current,
  previous,
  direction,
}) => {
  const [animation, setAnimation] = useState(undefined);
  const [display, setDisplay] = useState(current === index ? 'block' : 'none');

  // Handles setting the appropriate display and animation for the slide
  useEffect(() => {
    let animationTimer;

    // Previous is only undefined on initialization. This tells the component:
    // on mount, do not render the first slide with an animation.
    if (previous === undefined) return animationTimer;
    if (index !== current && index !== previous) return animationTimer;
    if (previous === current) return animationTimer;

    if (index === current) {
      setDisplay('block');
      if (direction === 'next') setAnimation(slideLeftCurrent);
      else setAnimation(slideRightCurrent);
    } else {
      animationTimer = setTimeout(() => {
        setDisplay('none');
      }, animationDuration-100);
      if (direction === 'next') setAnimation(slideLeftPrevious);
      else setAnimation(slideRightPrevious);
    }

    return () => clearTimeout(animationTimer);
  }, [current, direction, index, previous, animationDuration]);

  return (
    <StyledCarouselChild
      animationDuration={animationDuration}
      noDimensions={noDimensions}
      animation={animation}
      displayProp={display}
    >
      {children}
    </StyledCarouselChild>
  );
};

CarouselChild.propTypes = CarouselChildPropTypes;

export { CarouselChild };
