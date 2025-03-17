var _excluded = ["children", "color", "fill", "level", "overflowWrap", "responsive", "weight"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { StyledHeading } from './StyledHeading';
import { HeadingPropTypes } from './propTypes';
import { useForwardedRef } from '../../utils';
import { useSkeleton } from '../Skeleton';
import { HeadingSkeleton } from './HeadingSkeleton';
import { useThemeValue } from '../../utils/useThemeValue';
import { ResponsiveContainerContext } from '../../contexts';
var Heading = /*#__PURE__*/forwardRef(function (_ref, ref // munged to avoid styled-components putting it in the DOM
) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    overflowWrapProp = _ref.overflowWrap,
    _ref$responsive = _ref.responsive,
    responsiveProp = _ref$responsive === void 0 ? true : _ref$responsive,
    weight = _ref.weight,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var headingRef = useForwardedRef(ref);
  var _useState = useState(overflowWrapProp || 'break-word'),
    overflowWrap = _useState[0],
    setOverflowWrap = _useState[1];
  var responsiveContainer = useContext(ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var skeleton = useSkeleton();

  // handle overflowWrap of heading
  useLayoutEffect(function () {
    var updateOverflowWrap = function updateOverflowWrap() {
      var wrap;
      if (!overflowWrapProp && headingRef.current) {
        wrap = headingRef.current.scrollWidth > headingRef.current.offsetWidth ? 'anywhere' : 'break-word';
        setOverflowWrap(wrap);
      }
    };
    window.addEventListener('resize', updateOverflowWrap);
    updateOverflowWrap();
    return function () {
      return window.removeEventListener('resize', updateOverflowWrap);
    };
  }, [headingRef, overflowWrapProp]);
  var content = children;
  if (skeleton) {
    content = /*#__PURE__*/React.createElement(HeadingSkeleton, _extends({
      level: level,
      fill: fill,
      responsive: responsive
    }, rest));
  }
  return (
    /*#__PURE__*/
    // enforce level to be a number
    React.createElement(StyledHeading, _extends({
      as: "h" + level,
      colorProp: color,
      fillProp: fill,
      level: +level,
      overflowWrap: overflowWrap,
      responsive: responsive,
      weight: weight
    }, passThemeFlag, rest, {
      ref: headingRef
    }), content)
  );
});
Heading.displayName = 'Heading';
Heading.propTypes = HeadingPropTypes;
export { Heading };