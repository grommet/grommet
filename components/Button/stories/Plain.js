"use strict";

exports.__esModule = true;
exports.Active = exports.Plain = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PlainButtons = function PlainButtons(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Add"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: {
      global: {
        font: {
          family: "-apple-system, BlinkMacSystemFont"
        }
      },
      button: {
        "default": {}
      } // enabling kind button functionality

    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Kind"))))));
};

var Plain = function Plain() {
  return /*#__PURE__*/_react["default"].createElement(PlainButtons, null);
};

exports.Plain = Plain;

var Active = function Active() {
  return /*#__PURE__*/_react["default"].createElement(PlainButtons, {
    active: true
  });
};

exports.Active = Active;