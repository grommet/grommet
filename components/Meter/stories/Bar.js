"use strict";

exports.__esModule = true;
exports["default"] = exports.Bar = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Bar = function Bar() {
  var value = 30;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "bar",
    value: value
  })));
};

exports.Bar = Bar;
var _default = {
  title: 'Visualizations/Meter/Bar'
};
exports["default"] = _default;