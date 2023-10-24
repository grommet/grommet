"use strict";

exports.__esModule = true;
exports["default"] = exports.ThemeMode = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ThemeMode = exports.ThemeMode = function ThemeMode() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    themeMode: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, "\"auto\" themeMode"));
};
var _default = exports["default"] = {
  title: 'Utilities/Grommet/ThemeMode'
};