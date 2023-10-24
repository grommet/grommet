"use strict";

exports.__esModule = true;
exports["default"] = exports.GuideDefault = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.abs(v * 100)
  });
}
var GuideDefault = exports.GuideDefault = function GuideDefault() {
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
      series: "percent",
      guide: true
    }))
    // </Grommet>
  );
};

GuideDefault.storyName = 'Guide default';
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Guide default'
};