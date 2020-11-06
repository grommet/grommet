"use strict";

exports.__esModule = true;
exports.StackedBars = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 7; i += 1) {
  data.push({
    date: "2020-07-" + (i % 31 + 1).toString().padStart(2, 0),
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    bonus: Math.floor(Math.abs(Math.cos(i / 2.0) * 100))
  });
}

var StackedBars = function StackedBars() {
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
      render: function render(date) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          margin: {
            horizontal: 'xsmall'
          }
        }, new Date(date).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric'
        }));
      }
    }, 'usage', 'bonus'],
    chart: [{
      property: ['usage', 'bonus'],
      type: 'bars'
    }],
    axis: {
      x: {
        property: 'date',
        granularity: 'fine'
      },
      y: true
    },
    guide: {
      y: true
    },
    legend: true
  })));
};

exports.StackedBars = StackedBars;