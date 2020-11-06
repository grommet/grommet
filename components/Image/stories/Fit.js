"use strict";

exports.__esModule = true;
exports.Fit = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fit = function Fit() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "contain"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "small",
    width: "small",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "cover"
  }))));
};

exports.Fit = Fit;