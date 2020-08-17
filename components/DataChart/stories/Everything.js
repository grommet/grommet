"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  var v2 = Math.cos(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 10),
    need: Math.floor(v2 * 9),
    needMax: Math.floor(v2 * 9) + i / 2,
    needMin: Math.floor(v2 * 9) - i / 2,
    growth: i
  });
}

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    series: ['date', 'amount', 'need', 'growth'],
    bounds: "align",
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-2',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xxsmall',
      round: true
    }, {
      property: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      property: 'amount',
      type: 'point',
      thickness: 'small'
    }, {
      property: ['needMin', 'needMax'],
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'need',
      type: 'line',
      thickness: 'xxsmall',
      dash: true,
      round: true
    }, {
      property: 'need',
      type: 'point',
      thickness: 'small'
    }, {
      property: 'growth',
      type: 'line',
      thickness: 'hair'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: {
        granularity: 'medium'
      },
      x: {
        granularity: 'fine'
      }
    },
    gap: "xsmall",
    pad: "small",
    legend: true,
    detail: true
  })));
};

(0, _react2.storiesOf)('DataChart', module).add('Everything', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});