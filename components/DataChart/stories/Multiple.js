"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 100)
  });
}

var MultipleDataChart = function MultipleDataChart() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    chart: [{
      key: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: {
        color: 'graph-0',
        opacity: 'medium'
      }
    }, {
      key: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      key: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      key: 'amount',
      type: 'point',
      round: true,
      thickness: 'medium'
    }],
    xAxis: {
      labels: 2,
      key: 'date',
      render: function render(date) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          pad: "xsmall",
          align: "start"
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })));
      }
    },
    yAxis: {
      guide: true,
      labels: 3
    },
    gap: "medium",
    pad: "small"
  })));
};

(0, _react2.storiesOf)('DataChart', module).add('Multiple', function () {
  return /*#__PURE__*/_react["default"].createElement(MultipleDataChart, null);
});