"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

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

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    chart: [{
      keys: [{
        key: 'usage',
        color: 'graph-1'
      }, {
        key: 'bonus',
        color: 'graph-2'
      }],
      type: 'bar'
    }],
    xAxis: {
      key: 'date',
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
    },
    yAxis: {
      guide: true
    },
    gap: "medium"
  })));
};

(0, _react2.storiesOf)('DataChart', module).add('Stacked bars', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});