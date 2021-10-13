"use strict";

exports.__esModule = true;
exports.CarouselChild = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("./propTypes");

var _Box = require("../Box");

var _contexts = require("../../contexts");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CarouselChild = function CarouselChild(_ref) {
  var fill = _ref.fill,
      play = _ref.play,
      index = _ref.index,
      activeIndex = _ref.activeIndex,
      priorActiveIndex = _ref.priorActiveIndex,
      children = _ref.children;

  var theme = (0, _react.useContext)(_contexts.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(undefined),
      animation = _useState[0],
      setAnimation = _useState[1];

  var _useState2 = (0, _react.useState)('hidden'),
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
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: fill,
    overflow: "hidden",
    style: {
      visibility: visibility
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: fill,
    animation: animation
  }, children));
};

exports.CarouselChild = CarouselChild;
CarouselChild.propTypes = _propTypes.CarouselChildPropTypes;
CarouselChild.defaultProps = {
  fill: false,
  play: undefined,
  priorActiveIndex: undefined
};