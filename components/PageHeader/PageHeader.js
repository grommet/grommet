"use strict";

exports.__esModule = true;
exports.PageHeader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _Grid = require("../Grid");
var _Paragraph = require("../Paragraph");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["actions", "gridProps", "parent", "responsive", "size", "subtitle", "title", "level"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var sizeStyle = function sizeStyle(size, feature, theme, breakpoint) {
  var _ref, _theme$pageHeader$siz, _theme$global$breakpo, _theme$global$breakpo2;
  var style = _extends({}, theme.pageHeader[feature], (_ref = size && ((_theme$pageHeader$siz = theme.pageHeader.size[size]) == null ? void 0 : _theme$pageHeader$siz[feature])) != null ? _ref : theme.pageHeader[feature], (!size || size === 'medium') && feature === 'subtitle' && ((_theme$global$breakpo = theme.global.breakpoints[breakpoint]) == null ? void 0 : _theme$global$breakpo.value) <= ((_theme$global$breakpo2 = theme.global.breakpoints.small) == null ? void 0 : _theme$global$breakpo2.value) && {
    size: 'medium'
  });
  return style;
};
var PageHeader = exports.PageHeader = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var actions = _ref2.actions,
    gridPropsProp = _ref2.gridProps,
    parent = _ref2.parent,
    responsive = _ref2.responsive,
    size = _ref2.size,
    subtitle = _ref2.subtitle,
    title = _ref2.title,
    level = _ref2.level,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var breakpoint = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var actionsProps = _extends({}, theme.pageHeader.actions);
  var gridProps = theme.pageHeader[breakpoint] || theme.pageHeader.medium;
  if (responsive && theme.pageHeader.responsive.breakpoints.includes(breakpoint)) {
    gridProps = _extends({}, gridProps, theme.pageHeader.responsive);
    actionsProps = _extends({}, actionsProps, theme.pageHeader.responsive.actions);
  }
  var _gridProps = gridProps,
    areas = _gridProps.areas,
    columns = _gridProps.columns,
    gap = _gridProps.gap,
    rows = _gridProps.rows;
  return /*#__PURE__*/_react["default"].createElement(_Header.Header, _extends({
    ref: ref,
    direction: "column",
    gap: "none",
    pad: sizeStyle(size, 'pad', theme)
  }, rest), /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    columns: columns,
    rows: rows,
    areas: areas,
    gap: gap,
    fill: "horizontal"
  }, gridPropsProp), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    gridArea: "parent"
  }, theme.pageHeader.parent), parent), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gridArea: "title"
  }, typeof title === 'string' ? /*#__PURE__*/_react["default"].createElement(_Heading.Heading, _extends({}, sizeStyle(size, 'title', theme), {
    level: level
  }), title) : title), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gridArea: "subtitle"
  }, typeof subtitle === 'string' ? /*#__PURE__*/_react["default"].createElement(_Paragraph.Paragraph, sizeStyle(size, 'subtitle', theme, breakpoint), subtitle) : subtitle), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    gridArea: "actions"
  }, actionsProps), actions)));
});
PageHeader.displayName = 'PageHeader';