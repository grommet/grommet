import React, { useContext, useState, useEffect } from 'react';
import { CarouselChildPropTypes } from './propTypes';
import { Box } from '../Box';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';

var CarouselChild = function CarouselChild(_ref) {
  var fill = _ref.fill,
      play = _ref.play,
      index = _ref.index,
      activeIndex = _ref.activeIndex,
      priorActiveIndex = _ref.priorActiveIndex,
      children = _ref.children;
  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(undefined),
      animation = _useState[0],
      setAnimation = _useState[1];

  var _useState2 = useState('hidden'),
      visibility = _useState2[0],
      setVisibility = _useState2[1];

  useEffect(function () {
    var timer;

    if (index === activeIndex) {
      if (priorActiveIndex !== undefined) {
        /**
         * This check will only be false onMount of the component. It ensures
         * the initial active slide of the Carousel renders with no animation.
         */
        setAnimation({
          type: play || priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
          size: 'xlarge',
          duration: theme.carousel.animation.duration
        });
      }

      setVisibility('visible');
    } else if (index === priorActiveIndex) {
      setAnimation({
        type: 'fadeOut',
        duration: theme.carousel.animation.duration
      });
      timer = setTimeout(function () {
        return setVisibility('hidden');
      }, theme.carousel.animation.duration);
    }

    return function () {
      return clearTimeout(timer);
    };
  }, [activeIndex, priorActiveIndex, index, play, theme.carousel.animation.duration]);
  return /*#__PURE__*/React.createElement(Box, {
    fill: fill,
    overflow: "hidden",
    style: {
      visibility: visibility
    }
  }, /*#__PURE__*/React.createElement(Box, {
    fill: fill,
    animation: animation
  }, children));
};

CarouselChild.propTypes = CarouselChildPropTypes;
CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined
};
export { CarouselChild };