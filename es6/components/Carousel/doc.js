function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Carousel) {
  var DocumentedCarousel = describe(Carousel).availableAt(getAvailableAtBadge('Carousel')).description("A carousel that cycles through children. Child components\n      would typically be Images. It is the caller's responsibility to ensure\n      that all children are the same size.").usage("import { Carousel } from 'grommet';\n<Carousel />");
  DocumentedCarousel.propTypes = _extends({}, genericProps, {
    fill: PropTypes.bool.description("Whether to expand to fill\n      all of the available width and height in the parent container."),
    play: PropTypes.number.description("If specified, the number of\n      milliseconds between automatically transitioning to the next child. It\n      will loop through all children indefinitely.")
  });
  return DocumentedCarousel;
};