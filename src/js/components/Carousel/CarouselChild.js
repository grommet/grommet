import React, { useState, useEffect } from 'react';
import { CarouselChildPropTypes } from './propTypes';

import { StyledCarouselChild } from './StyledCarousel';

import { Box } from '../Box';

const CarouselChild = ({
  animationDuration,
  fill,
  index,
  activeIndex,
  priorActiveIndex,
  direction,
  children,
}) => {
  const [animation, setAnimation] = useState(undefined);
  const [visibility, setVisibility] = useState(
    index === activeIndex ? 'visible' : 'hidden',
  );
  useEffect(() => {
    let timer;
    if (index === activeIndex) {
      if (priorActiveIndex !== undefined) {
        /**
         * This check will only be false onMount of the component. It ensures
         * the initial active slide of the Carousel renders with no animation.
         */
        setAnimation(
          direction === 'left' ? 'slideLeftCurrent' : 'slideRightCurrent',
        );
      }
      setVisibility('visible');
    } else if (index === priorActiveIndex) {
      setAnimation(
        direction === 'left' ? 'slideLeftPrevious' : 'slideRightPrevious',
      );
      timer = setTimeout(() => setVisibility('hidden'), animationDuration);
    }
    return () => clearTimeout(timer);
  }, [activeIndex, priorActiveIndex, index, direction, animationDuration]);
  const position = index === 0 ? 'relative' : 'absolute';

  return (
    <StyledCarouselChild
      fill={fill}
      visibilityProp={visibility}
      positionProp={position}
      animationType={animation}
      animationDuration={animationDuration}
    >
      <Box fill={fill}>{children}</Box>
    </StyledCarouselChild>
  );
};

CarouselChild.propTypes = CarouselChildPropTypes;

CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined,
};

export { CarouselChild };
