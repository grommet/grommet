"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GradientColorBox = function GradientColorBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)",
    round: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "white"
  }, "I have a linear gradient background")));
};

(0, _react2.storiesOf)('Box', module).add('Gradient', function () {
  return /*#__PURE__*/_react["default"].createElement(GradientColorBox, null);
});