"use strict";

exports.__esModule = true;
exports["default"] = exports.StackedLines = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 0; i < 7; i += 1) {
  data.push({
    date: "2020-07-" + (i % 31 + 1).toString().padStart(2, 0),
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    bonus: Math.floor(Math.abs(Math.cos(i / 2.0) * 100))
  });
}
var StackedLines = exports.StackedLines = function StackedLines() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
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
        type: 'lines',
        thickness: 'xsmall',
        round: true
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
    }))
    // </Grommet>
  );
};

StackedLines.storyName = 'Stacked lines';
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Stacked lines'
};