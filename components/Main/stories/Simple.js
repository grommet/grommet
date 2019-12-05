"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Header, {
    background: "light-4",
    pad: "small"
  }, _react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Header")), _react["default"].createElement(_grommet.Main, {
    pad: "small"
  }, "I am Main! Main is a good place to place your content."));
};

(0, _react2.storiesOf)('Main', module).add('Simple', function () {
  return _react["default"].createElement(Simple, null);
});