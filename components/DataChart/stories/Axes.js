"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.abs(v * 100)
  });
}

var AxesDataChart = function AxesDataChart() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    chart: {
      key: 'percent'
    },
    xAxis: {
      key: 'date',
      guide: true,
      render: function render(i) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          margin: {
            horizontal: 'small'
          }
        }, new Date(data[i].date).toLocaleDateString('en-US', {
          month: 'narrow'
        }));
      }
    },
    yAxis: {
      guide: true,
      labels: 3
    }
  })));
};

(0, _react2.storiesOf)('DataChart', module).add('Axes', function () {
  return /*#__PURE__*/_react["default"].createElement(AxesDataChart, null);
});