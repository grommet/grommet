"use strict";

exports.__esModule = true;
exports.NameValueList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Grid = require("../Grid");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _NameValueListContext = require("./NameValueListContext");
var _responsive = require("../../utils/responsive");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["align", "layout", "nameProps", "pairProps", "valueProps"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var NameValueList = exports.NameValueList = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
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
  if ((0, _responsive.isSmall)(size) || layout === 'grid') columns = {
    count: 'fit',
    size: !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth
  };else if (layout === 'column' && pairProps.direction === 'row') columns = [nameWidth, !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth];else columns = [valueWidth];
  var gap = theme.nameValueList.gap;
  if ((pairProps.direction === 'column' || (0, _responsive.isSmall)(size)) && (_theme$nameValueList$ = theme.nameValueList.pair) != null && (_theme$nameValueList$ = _theme$nameValueList$.column) != null && _theme$nameValueList$.gap) {
    gap = theme.nameValueList.pair.column.gap;
  }
  var listContextValue = (0, _react.useMemo)(function () {
    return {
      nameProps: nameProps,
      pairProps: pairProps,
      valueProps: valueProps
    };
  }, [nameProps, pairProps, valueProps]);
  return /*#__PURE__*/_react["default"].createElement(_NameValueListContext.NameValueListContext.Provider, {
    value: listContextValue
  }, /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    as: "dl",
    ref: ref,
    align: align,
    columns: columns,
    gap: gap,
    margin: "none" // override browser default margin for dl
  }, rest)));
});
NameValueList.displayName = 'NameValueList';