"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BarMeter = function BarMeter() {
  var value = 30;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: value
    }]
  })));
};

(0, _react2.storiesOf)('Meter', module).add('Bar', function () {
  return /*#__PURE__*/_react["default"].createElement(BarMeter, null);
});