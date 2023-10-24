"use strict";

exports.__esModule = true;
exports.CarouselChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _StyledCarousel = require("./StyledCarousel");
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CarouselChild = exports.CarouselChild = function CarouselChild(_ref) {
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
CarouselChild.propTypes = _propTypes.CarouselChildPropTypes;
CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined
};