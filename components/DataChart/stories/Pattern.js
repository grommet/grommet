"use strict";

exports.__esModule = true;
exports.Pattern = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100)
  });
}

var Pattern = function Pattern() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    series: "percent",
    chart: [{
      property: 'percent',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-0',
      opacity: 'strong',
      pattern: 'squares'
    }]
  })));
};

exports.Pattern = Pattern;