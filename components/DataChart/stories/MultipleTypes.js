"use strict";

exports.__esModule = true;
exports.MultipleTypes = void 0;

var _react = _interopRequireDefault(require("react"));

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

var MultipleTypes = function MultipleTypes() {
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
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          pad: "xsmall",
          align: "start"
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })));
      }
    }, 'amount'],
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-0',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      property: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      property: 'amount',
      type: 'point',
      round: true,
      thickness: 'medium'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: true
    },
    gap: "medium",
    pad: "small"
  })));
};

exports.MultipleTypes = MultipleTypes;