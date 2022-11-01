"use strict";

exports.__esModule = true;
exports.CarouselChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _StyledCarousel = require("./StyledCarousel");
var _Box = require("../Box");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CarouselChild = function CarouselChild(_ref) {
  var animationDuration = _ref.animationDuration,
    fill = _ref.fill,
    index = _ref.index,
    activeIndex = _ref.activeIndex,
    priorActiveIndex = _ref.priorActiveIndex,
    direction = _ref.direction,
    children = _ref.children;
  var _useState = (0, _react.useState)(undefined),
    animation = _useState[0],
    setAnimation = _useState[1];
  var _useState2 = (0, _react.useState)(index === activeIndex ? 'visible' : 'hidden'),
    visibility = _useState2[0],
    setVisibility = _useState2[1];
  (0, _react.useEffect)(function () {
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
  return /*#__PURE__*/_react["default"].createElement(_StyledCarousel.StyledCarouselChild, {
    fill: fill,
    visibilityProp: visibility,
    positionProp: position,
    animationType: animation,
    animationDuration: animationDuration
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: fill
  }, children));
};
exports.CarouselChild = CarouselChild;
CarouselChild.propTypes = _propTypes.CarouselChildPropTypes;
CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined
};