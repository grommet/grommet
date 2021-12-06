"use strict";

exports.__esModule = true;
exports["default"] = exports.Default = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultAnchor = function DefaultAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#"
  }, "Link"));
};

var Default = function Default() {
  return /*#__PURE__*/_react["default"].createElement(DefaultAnchor, null);
};

exports.Default = Default;
Default.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Anchor/Default'
};
exports["default"] = _default;