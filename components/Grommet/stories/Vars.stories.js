"use strict";

exports.__esModule = true;
exports["default"] = exports.Vars = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Vars = exports.Vars = function Vars() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    cssVars: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "var(--light-6)",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, "Checkout Grommet variables, you can find them in the StyledGrommet DOM."), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    "with": true
  }, "For example, the background color in this Box is using var(--light-6)")));
};
var _default = exports["default"] = {
  title: 'Utilities/Grommet/Vars'
};