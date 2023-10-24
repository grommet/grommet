"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HeadingExample = function HeadingExample() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Heading"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    skeleton: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Heading")));
};
var TextExample = function TextExample() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    skeleton: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text")));
};
var ParagraphExample = function ParagraphExample() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    skeleton: true,
    fill: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")));
};
var SkeletonExample = function SkeletonExample() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Skeleton"), /*#__PURE__*/_react["default"].createElement(_grommet.Skeleton, null), /*#__PURE__*/_react["default"].createElement(_grommet.Skeleton, {
    height: "small"
  }));
};
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(HeadingExample, null), /*#__PURE__*/_react["default"].createElement(TextExample, null), /*#__PURE__*/_react["default"].createElement(ParagraphExample, null), /*#__PURE__*/_react["default"].createElement(SkeletonExample, null));
};
var _default = exports["default"] = {
  title: 'Visualizations/Skeleton/Simple'
};