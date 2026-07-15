var _excluded = ["a11yTitle", "aria-label", "border", "fill", "height", "responsive", "rows", "tag", "as", "width"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext } from 'react';
import { StyledGrid } from './StyledGrid';
import { GridPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
import { ResponsiveContainerContext } from '../../contexts';
var Grid = /*#__PURE__*/forwardRef(function (props, ref) {
  var a11yTitle = props.a11yTitle,
    ariaLabel = props['aria-label'],
    border = props.border,
    fill = props.fill,
    height = props.height,
    _props$responsive = props.responsive,
    responsiveProp = _props$responsive === void 0 ? true : _props$responsive,
    rows = props.rows,
    tag = props.tag,
    as = props.as,
    width = props.width,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var responsiveContainer = useContext(ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  return /*#__PURE__*/React.createElement(StyledGrid, _extends({
    ref: ref,
    "aria-label": ariaLabel || a11yTitle,
    as: !as && tag ? tag : as,
    border: border,
    fillContainer: fill,
    heightProp: height,
    responsive: responsive,
    rowsProp: rows,
    widthProp: width
  }, passThemeFlag, rest));
});
Grid.displayName = 'Grid';
Grid.propTypes = GridPropTypes;

// Defualting to true to support existing code that relies on
// grid.available to create a fallback option
Grid.available = true;
export { Grid };