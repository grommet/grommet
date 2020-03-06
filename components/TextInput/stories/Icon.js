"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IconTextInput = function IconTextInput() {
  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium",
    gap: "medium"
  }, _react["default"].createElement(_grommet.TextInput, {
    icon: _react["default"].createElement(_grommetIcons.Search, null),
    placeholder: "search ..."
  }), _react["default"].createElement(_grommet.TextInput, {
    icon: _react["default"].createElement(_grommetIcons.Search, null),
    reverse: true,
    placeholder: "search ..."
  }))));
};

(0, _react2.storiesOf)('TextInput', module).add('Icon', function () {
  return _react["default"].createElement(IconTextInput, null);
});