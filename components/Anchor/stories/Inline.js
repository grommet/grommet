"use strict";

exports.__esModule = true;
exports.Inline = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InlineAnchor = function InlineAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "This is ", /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text.")));
};

var Inline = function Inline() {
  return /*#__PURE__*/_react["default"].createElement(InlineAnchor, null);
};

exports.Inline = Inline;