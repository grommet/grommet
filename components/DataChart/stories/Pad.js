"use strict";

exports.__esModule = true;
exports["default"] = exports.Pad = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 1; i < 3; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100)
  });
}
var Pad = exports.Pad = function Pad() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
      bounds: {
        y: [0, 100]
      },
      guide: true,
      detail: true,
      pad: {
        horizontal: 'xlarge'
      },
      data: data,
      series: ['percent', {}],
      chart: [{
        property: 'percent',
        thickness: 'medium'
      }]
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Pad'
};