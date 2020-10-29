"use strict";

exports.__esModule = true;
exports.RoutedButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RoutedButton = function RoutedButton() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), /*#__PURE__*/_react["default"].createElement(_grommet.RoutedButton, {
    label: "Go",
    path: "/"
  })));
};

exports.RoutedButton = RoutedButton;