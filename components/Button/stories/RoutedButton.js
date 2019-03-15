"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteButton = function RouteButton() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), _react.default.createElement(_grommet.RoutedButton, {
    label: "Go",
    path: "/"
  })));
};

(0, _react2.storiesOf)('Button', module).add('RoutedButton', function () {
  return _react.default.createElement(RouteButton, null);
});