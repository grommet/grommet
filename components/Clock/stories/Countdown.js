"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
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

(0, _react2.storiesOf)('Clock', module).add('Countdown', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
}, {
  chromatic: {
    disable: true
  }
});