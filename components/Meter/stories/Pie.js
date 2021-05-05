"use strict";

exports.__esModule = true;
exports["default"] = exports.Pie = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pie = function Pie() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "pie",
    background: "light-2",
    size: "small",
    values: [{
      value: 70
    }, {
      value: 20
    }, {
      value: 10
    }]
  })));
};

exports.Pie = Pie;
var _default = {
  title: 'Visualizations/Meter/Pie'
};
exports["default"] = _default;