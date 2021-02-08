"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Fill = function Fill(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    align: "center",
    height: "700px",
    width: "300px",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))));
};

exports.Fill = Fill;
var _default = {
  title: 'Controls/Button/Fill'
};
exports["default"] = _default;