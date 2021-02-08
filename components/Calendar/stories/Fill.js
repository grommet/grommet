"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fill = function Fill() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "large",
    width: "large",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    fill: true,
    daysOfWeek: true
  }))));
};

exports.Fill = Fill;
var _default = {
  title: 'Visualizations/Calendar/Fill'
};
exports["default"] = _default;