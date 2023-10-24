"use strict";

exports.__esModule = true;
exports["default"] = exports.Size = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SizeAnchor = function SizeAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '10px'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      size: size,
      label: size,
      href: "#"
    }));
  }));
};
var Size = exports.Size = function Size() {
  return /*#__PURE__*/_react["default"].createElement(SizeAnchor, null);
};
var _default = exports["default"] = {
  title: 'Controls/Anchor/Size'
};