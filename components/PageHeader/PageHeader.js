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

var _excluded = ["actions", "gridProps", "parent", "responsive", "subtitle", "title"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PageHeader = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var actions = _ref.actions,
      gridPropsProp = _ref.gridProps,
      parent = _ref.parent,
      responsive = _ref.responsive,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

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
    pad: theme.pageHeader.pad
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
  }, typeof title === 'string' ? /*#__PURE__*/_react["default"].createElement(_Heading.Heading, theme.pageHeader.title, title) : title), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gridArea: "subtitle"
  }, typeof subtitle === 'string' ? /*#__PURE__*/_react["default"].createElement(_Paragraph.Paragraph, theme.pageHeader.subtitle, subtitle) : subtitle), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    gridArea: "actions"
  }, actionsProps), actions)));
});
exports.PageHeader = PageHeader;
PageHeader.displayName = 'PageHeader';