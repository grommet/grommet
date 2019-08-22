"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Disabled = function Disabled() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, _react["default"].createElement(_grommet.Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }))));
};

(0, _react2.storiesOf)('Anchor', module).add('Disabled', function () {
  return _react["default"].createElement(Disabled, null);
});