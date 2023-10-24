"use strict";

exports.__esModule = true;
exports.PageHeader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _Grid = require("../Grid");
var _Paragraph = require("../Paragraph");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _excluded = ["actions", "gridProps", "parent", "responsive", "size", "subtitle", "title", "level"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
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