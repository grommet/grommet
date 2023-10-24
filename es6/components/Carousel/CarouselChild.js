import React, { useState, useEffect } from 'react';
import { CarouselChildPropTypes } from './propTypes';
import { StyledCarouselChild } from './StyledCarousel';
import { Box } from '../Box';
var CarouselChild = function CarouselChild(_ref) {
  var animationDuration = _ref.animationDuration,
    fill = _ref.fill,
    index = _ref.index,
    activeIndex = _ref.activeIndex,
    priorActiveIndex = _ref.priorActiveIndex,
    direction = _ref.direction,
    children = _ref.children;
  var _useState = useState(undefined),
    animation = _useState[0],
    setAnimation = _useState[1];
  var _useState2 = useState(index === activeIndex ? 'visible' : 'hidden'),
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
        setAnimation(direction === 'left' ? 'slideLeftCurrent' : 'slideRightCurrent');
      }
      setVisibility('visible');
    } else if (index === priorActiveIndex) {
      setAnimation(direction === 'left' ? 'slideLeftPrevious' : 'slideRightPrevious');
      timer = setTimeout(function () {
        return setVisibility('hidden');
      }, animationDuration);
    }
    return function () {
      return clearTimeout(timer);
    };
  }, [activeIndex, priorActiveIndex, index, direction, animationDuration]);
  var position = index === 0 ? 'relative' : 'absolute';
  return /*#__PURE__*/React.createElement(StyledCarouselChild, {
    fill: fill,
    visibilityProp: visibility,
    positionProp: position,
    animationType: animation,
    animationDuration: animationDuration
  }, /*#__PURE__*/React.createElement(Box, {
    fill: fill
  }, children));
};
CarouselChild.propTypes = CarouselChildPropTypes;
CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined
};
export { CarouselChild };