"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetThemeHpe = require("grommet-theme-hpe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Background = function Background() {
  var themeColor = 'background-back';
  var hexValue = '#DCD0FF';
  var cssColor = 'gold';
  return _react["default"].createElement(_grommet.Box, {
    gap: "medium"
  }, _react["default"].createElement(_grommet.Grommet, null, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with no theme or background prop"))), _react["default"].createElement(_grommet.Grommet, {
    theme: _grommetThemeHpe.hpe,
    themeMode: "dark"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with theme & themeMode but no background prop"))), _react["default"].createElement(_grommet.Grommet, {
    theme: _grommetThemeHpe.hpe,
    themeMode: "light",
    background: themeColor
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with background as theme color of '", themeColor, "'"))), _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: hexValue
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with background as HEX value of '", hexValue, "'"))), _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: cssColor
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with background as CSS color name of '", cssColor, "'"))), _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    background: {
      color: 'pink',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Grommet with background as object containing color and image"))));
};

(0, _react2.storiesOf)('Grommet', module).add('Background', function () {
  return _react["default"].createElement(Background, null);
});