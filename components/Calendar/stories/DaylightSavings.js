"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DSTCalendar has dates specifically chosen to identify issues with
// crossing the daylight savings time boundary (from California).
var DSTCalendar = function DSTCalendar() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Calendar, {
    date: "2018-11-04T07:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  })));
};

(0, _react2.storiesOf)('Calendar', module).add('Daylight Savings Time', function () {
  return _react.default.createElement(DSTCalendar, null);
});