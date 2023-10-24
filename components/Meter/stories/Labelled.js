"use strict";

exports.__esModule = true;
exports["default"] = exports.Labelled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Labelled = exports.Labelled = function Labelled() {
  var meterValue = 30;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: meterValue
      }],
      size: "xsmall",
      thickness: "small"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: {
        bottom: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "xlarge",
      weight: "bold"
    }, meterValue), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "%"))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Labelled'
};