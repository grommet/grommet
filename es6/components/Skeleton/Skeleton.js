var _excluded = ["as", "colors", "width", "height", "responsive"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext } from 'react';
import { SkeletonPropTypes } from './propTypes';
import { useSkeleton } from './SkeletonContext';
import { StyledSkeleton } from './StyledSkeleton';
import { useThemeValue } from '../../utils/useThemeValue';
import { ResponsiveContainerContext } from '../../contexts';
var Skeleton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$skeleton;
  var as = _ref.as,
    colorsProp = _ref.colors,
    widthProp = _ref.width,
    heightProp = _ref.height,
    responsiveProp = _ref.responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var skeleton = useSkeleton();
  var depth = (skeleton == null ? void 0 : skeleton.depth) || 0;
  var responsiveContainer = useContext(ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var colors = colorsProp || (theme == null || (_theme$skeleton = theme.skeleton) == null ? void 0 : _theme$skeleton.colors);
  var themeColors = colors[theme.dark ? 'dark' : 'light'];
  var background = themeColors[(depth + 1) % themeColors.length];
  return /*#__PURE__*/React.createElement(StyledSkeleton, _extends({
    ref: ref,
    as: as,
    background: background,
    widthProp: widthProp,
    heightProp: heightProp,
    responsive: responsive
  }, passThemeFlag, rest));
});
Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = SkeletonPropTypes;
export { Skeleton };