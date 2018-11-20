"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DigitalClock = function DigitalClock() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Clock, {
    type: "digital"
  }));
};

var AnalogClock = function AnalogClock() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Clock, {
    type: "analog"
  }));
};

(0, _react2.storiesOf)('Clock', module).add('Digital Clock', function () {
  return _react.default.createElement(DigitalClock, null);
}).add('Analog Clock', function () {
  return _react.default.createElement(AnalogClock, null);
});