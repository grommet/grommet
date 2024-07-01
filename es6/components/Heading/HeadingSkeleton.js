function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { Skeleton } from '../Skeleton';
import { useThemeValue } from '../../utils/useThemeValue';
var HeadingSkeleton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var as = _ref.as,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    size = _ref.size;
  var theme = useThemeValue();
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
export { HeadingSkeleton };