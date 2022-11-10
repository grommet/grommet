function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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