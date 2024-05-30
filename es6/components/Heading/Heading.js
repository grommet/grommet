var _excluded = ["children", "color", "fill", "level", "overflowWrap", "weight"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { StyledHeading } from './StyledHeading';
import { HeadingPropTypes } from './propTypes';
import { useForwardedRef } from '../../utils';
import { useSkeleton } from '../Skeleton';
import { HeadingSkeleton } from './HeadingSkeleton';
var Heading = /*#__PURE__*/forwardRef(function (_ref, ref // munged to avoid styled-components putting it in the DOM
) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    level = _ref.level,
    overflowWrapProp = _ref.overflowWrap,
    weight = _ref.weight,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var headingRef = useForwardedRef(ref);
  var _useState = useState(overflowWrapProp || 'break-word'),
    overflowWrap = _useState[0],
    setOverflowWrap = _useState[1];
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
      fill: fill
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
      weight: weight
    }, rest, {
      ref: headingRef
    }), content)
  );
});
Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true
};
Heading.propTypes = HeadingPropTypes;
export { Heading };