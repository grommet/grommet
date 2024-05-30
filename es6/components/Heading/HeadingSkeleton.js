function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Skeleton } from '../Skeleton';
var HeadingSkeleton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var as = _ref.as,
    level = _ref.level,
    size = _ref.size;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var levelStyle = theme.heading.level[level];
  var data = levelStyle == null ? void 0 : levelStyle[size || 'medium'];
  var height = data ? data.height : size;
  return /*#__PURE__*/React.createElement(Skeleton, _extends({
    as: as,
    ref: ref,
    height: height
  }, theme.heading.skeleton));
});
HeadingSkeleton.displayName = 'HeadingSkeleton';
HeadingSkeleton.defaultProps = {
  level: 1
};
export { HeadingSkeleton };