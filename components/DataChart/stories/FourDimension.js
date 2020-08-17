"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 1; i < 32; i += 1) {
  data.push({
    name: "Name " + i,
    strength: Math.sin(i / 2.0) * 4,
    risk: Math.cos(i / 2.0) * 4,
    cost: Math.abs(Math.cosh(i / 2.0) * 16) % 96,
    effort: i % 16
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
    series: ['name', 'strength', 'risk', 'cost', 'effort'],
    chart: {
      type: 'point',
      point: 'circle',
      property: {
        x: 'strength',
        y: 'risk',
        thickness: 'cost',
        // Want a way to take two color values and automatically generate
        // transformation
        color: {
          property: 'effort',
          transform: function transform(v) {
            return "#" + (16 - v).toString(16) + "0" + (4 + v).toString(16) + "0" + (4 + v).toString(16) + "0";
          }
        }
      },
      opacity: 'strong'
    },
    axis: {
      x: {
        granularity: 'medium'
      },
      y: {
        granularity: 'medium'
      }
    },
    guide: true,
    legend: true
  })));
};

(0, _react2.storiesOf)('DataChart', module).add('Four Dimensions', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});