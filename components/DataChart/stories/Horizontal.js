"use strict";

exports.__esModule = true;
exports["default"] = exports.Horizontal = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100),
    label: "Label " + i
  });
}
var Horizontal = exports.Horizontal = function Horizontal() {
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
        property: 'label',
        render: function render(label) {
          return label;
        }
      }, {
        property: 'percent',
        suffix: '%'
      }],
      direction: "horizontal",
      size: "medium",
      axis: {
        x: {
          granularity: 'fine'
        },
        y: {
          property: 'label',
          granularity: 'fine'
        }
      },
      guide: {
        x: {
          granularity: 'fine'
        },
        y: {
          granularity: 'fine'
        }
      }
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Horizontal'
};