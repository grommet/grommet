"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SimpleAnchor = function SimpleAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium",
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#"
  }, "Link"), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: "none"
  }, "This is ", /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text."));
};
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(SimpleAnchor, null);
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Anchor/Simple'
};