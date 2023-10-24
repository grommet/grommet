"use strict";

exports.__esModule = true;
exports["default"] = exports.Placeholder = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Placeholder = exports.Placeholder = function Placeholder() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
      data: [{
        date: '2022-01-02'
      }, {
        date: '2022-02-02'
      }, {
        date: '2022-03-02'
      }],
      series: ['date', 'percent'],
      bounds: {
        y: [0, 100]
      },
      guide: {
        y: {
          granularity: 'medium'
        }
      },
      placeholder: "no data"
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Placeholder'
};