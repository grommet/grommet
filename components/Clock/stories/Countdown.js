"use strict";

exports.__esModule = true;
exports["default"] = exports.Countdown = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Countdown = exports.Countdown = function Countdown() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
      type: "digital",
      time: "PT0H0M20S",
      run: "backward"
    }))
    // </Grommet>
  );
};

Countdown.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Clock/Countdown'
};