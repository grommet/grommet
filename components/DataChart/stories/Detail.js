"use strict";

exports.__esModule = true;
exports["default"] = exports.Detail = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    percent: Math.abs(v * 100)
  });
}

var Detail = function Detail() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    series: [{
      property: 'date',
      label: 'Date'
    }, {
      property: 'percent',
      label: 'Percent',
      render: function render(value) {
        return Math.round(value) + "%";
      }
    }],
    chart: "percent",
    detail: true,
    axis: {
      x: {
        property: 'date',
        granularity: 'medium'
      }
    }
  })));
};

exports.Detail = Detail;
var _default = {
  title: 'Visualizations/DataChart/Detail'
};
exports["default"] = _default;