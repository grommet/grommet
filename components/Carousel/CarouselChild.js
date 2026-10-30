"use strict";

exports.__esModule = true;
exports.CarouselChild = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _StyledCarousel = require("./StyledCarousel");
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var CarouselChild = exports.CarouselChild = function CarouselChild(_ref) {
  var animationDuration = _ref.animationDuration,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? false : _ref$fill,
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