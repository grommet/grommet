"use strict";

exports.__esModule = true;
exports.GuideDefault = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.abs(v * 100)
  });
}

var GuideDefault = function GuideDefault() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    series: "percent",
    guide: true
  })));
};

exports.GuideDefault = GuideDefault;