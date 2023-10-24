"use strict";

exports.__esModule = true;
exports["default"] = exports.RoutedButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RoutedButton = exports.RoutedButton = function RoutedButton() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), /*#__PURE__*/_react["default"].createElement(_grommet.RoutedButton, {
    label: "Go",
    path: "/"
  }));
};
RoutedButton.storyName = 'Routed button';
var _default = exports["default"] = {
  title: "Controls/Button/Routed button"
};