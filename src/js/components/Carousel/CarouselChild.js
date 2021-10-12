import React, { useContext, useState, useEffect } from 'react';
import { CarouselChildPropTypes } from './propTypes';

import { Box } from '../Box';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';

const CarouselChild = ({
  fill,
  play,
  index,
  activeIndex,
  priorActiveIndex,
  children,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [animation, setAnimation] = useState(undefined);
  const [visibility, setVisibility] = useState('hidden');
  useEffect(() => {
    let timer;
    if (index === activeIndex) {
      if (priorActiveIndex !== undefined) {
        /**
         * This check will only be false onMount of the component. It ensures
         * the initial active slide of the Carousel renders with no animation.
         */
        setAnimation({
          type:
            play || priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
          size: 'xlarge',
          duration: theme.carousel.animation.duration,
        });
      }
      setVisibility('visible');
    } else if (index === priorActiveIndex) {
      setAnimation({
        type: 'fadeOut',
        duration: theme.carousel.animation.duration,
      });
      timer = setTimeout(
        () => setVisibility('hidden'),
        theme.carousel.animation.duration,
      );
    }
    return () => clearTimeout(timer);
  }, [
    activeIndex,
    priorActiveIndex,
    index,
    play,
    theme.carousel.animation.duration,
  ]);
  return (
    <Box fill={fill} overflow="hidden" style={{ visibility }}>
      <Box fill={fill} animation={animation}>
        {children}
      </Box>
    </Box>
  );
};

CarouselChild.propTypes = CarouselChildPropTypes;

CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined,
};

export { CarouselChild };
