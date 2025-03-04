var _excluded = ["align", "layout", "nameProps", "pairProps", "valueProps"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useMemo } from 'react';
import { Grid } from '../Grid';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValueListContext } from './NameValueListContext';
import { isSmall } from '../../utils/responsive';
import { useThemeValue } from '../../utils/useThemeValue';
var NameValueList = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$nameValueList$;
  var align = _ref.align,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'column' : _ref$layout,
    nameProps = _ref.nameProps,
    _ref$pairProps = _ref.pairProps,
    pairProps = _ref$pairProps === void 0 ? {
      direction: 'row'
    } : _ref$pairProps,
    valueProps = _ref.valueProps,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = useContext(ResponsiveContext);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;

  // If layout is grid, valueWidth sets the max width of the column.
  // Grid will 'fit' as many columns of valueWidth per row as container's
  // width allows.
  var columns;
  var valueWidth = (valueProps == null ? void 0 : valueProps.width) || theme.nameValueList.value.width;
  var nameWidth = (nameProps == null ? void 0 : nameProps.width) || theme.nameValueList.name.width;
  var formatWidth = function formatWidth(width) {
    return typeof width === 'object' ? [width.min, width.max] : width;
  };
  nameWidth = formatWidth(nameWidth);
  valueWidth = formatWidth(valueWidth);
  if (isSmall(size) || layout === 'grid') columns = {
    count: 'fit',
    size: !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth
  };else if (layout === 'column' && pairProps.direction === 'row') columns = [nameWidth, !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth];else columns = [valueWidth];
  var gap = theme.nameValueList.gap;
  if ((pairProps.direction === 'column' || isSmall(size)) && (_theme$nameValueList$ = theme.nameValueList.pair) != null && (_theme$nameValueList$ = _theme$nameValueList$.column) != null && _theme$nameValueList$.gap) {
    gap = theme.nameValueList.pair.column.gap;
  }
  var listContextValue = useMemo(function () {
    return {
      nameProps: nameProps,
      pairProps: pairProps,
      valueProps: valueProps
    };
  }, [nameProps, pairProps, valueProps]);
  return /*#__PURE__*/React.createElement(NameValueListContext.Provider, {
    value: listContextValue
  }, /*#__PURE__*/React.createElement(Grid, _extends({
    as: "dl",
    ref: ref,
    align: align,
    columns: columns,
    gap: gap,
    margin: "none" // override browser default margin for dl
  }, rest)));
});
NameValueList.displayName = 'NameValueList';
export { NameValueList };