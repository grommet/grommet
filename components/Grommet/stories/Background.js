"use strict";

exports.__esModule = true;
exports.Background = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetThemeHpe = require("grommet-theme-hpe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Background = function Background() {
  var themeColor = 'background-back';
  var hexValue = '#DCD0FF';
  var cssColor = 'gold';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with no theme or background prop"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommetThemeHpe.hpe,
    themeMode: "dark"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with theme & themeMode but no background prop"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommetThemeHpe.hpe,
    themeMode: "light",
    background: themeColor
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with background as theme color of '", themeColor, "'"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: hexValue
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with background as HEX value of '", hexValue, "'"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: cssColor
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with background as CSS color name of '", cssColor, "'"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: {
      color: 'pink',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Grommet with background as object containing color and image"))));
};

exports.Background = Background;