"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ColoredButton = function ColoredButton(props) {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, _react.default.createElement(_grommet.Button, _extends({
    primary: true,
    color: "dark-1",
    label: "Submit dark-1",
    onClick: function onClick() {}
  }, props)), _react.default.createElement(_grommet.Button, _extends({
    primary: true,
    color: "#111111",
    label: "Submit #111111",
    onClick: function onClick() {}
  }, props)), _react.default.createElement(_grommet.Button, _extends({
    primary: true,
    color: "#777",
    label: "Submit #777",
    onClick: function onClick() {}
  }, props))));
};

(0, _react2.storiesOf)('Button', module).add('Colored', function () {
  return _react.default.createElement(ColoredButton, null);
});