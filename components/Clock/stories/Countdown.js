"use strict";

exports.__esModule = true;
exports.Countdown = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Countdown = function Countdown() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "digital",
    time: "PT0H0M20S",
    run: "backward"
  })));
};

exports.Countdown = Countdown;
Countdown.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};