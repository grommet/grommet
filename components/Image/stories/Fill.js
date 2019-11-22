"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fill = function Fill() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "start",
    gap: "small"
  }, _react["default"].createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, _react["default"].createElement(_grommet.Anchor, {
    href: "#"
  }, _react["default"].createElement(_grommet.Image, {
    fit: "cover",
    fill: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }))), _react["default"].createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, _react["default"].createElement(_grommet.Anchor, {
    href: "#"
  }, _react["default"].createElement(_grommet.Image, {
    fit: "contain",
    fill: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })))));
};

(0, _react2.storiesOf)('Image', module).add('Fill', function () {
  return _react["default"].createElement(Fill, null);
});