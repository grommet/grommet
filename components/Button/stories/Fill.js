"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FillButtons = function FillButtons(props) {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    direction: "row"
  }, _react.default.createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    pad: "medium",
    gap: "medium"
  }, _react.default.createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, _react.default.createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props))), _react.default.createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, _react.default.createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props))), _react.default.createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, _react.default.createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props))), _react.default.createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, _react.default.createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))), _react.default.createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    align: "center",
    height: "700px",
    width: "300px",
    gap: "medium"
  }, _react.default.createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props)), _react.default.createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props)), _react.default.createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props)), _react.default.createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))));
};

(0, _react2.storiesOf)('Button', module).add('Fill', function () {
  return _react.default.createElement(FillButtons, null);
});