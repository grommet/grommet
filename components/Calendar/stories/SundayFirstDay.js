"use strict";

exports.__esModule = true;
exports.SundayFirstDayCalendar = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// When the first day of the month is Sunday, and the request of firstDayOfWeek
// is Monday, we are verifing we are not missing a week, issue 3253.
var SundayFirstDayCalendar = function SundayFirstDayCalendar() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    firstDayOfWeek: 1,
    date: new Date(2019, 8, 2).toISOString()
  })));
};

exports.SundayFirstDayCalendar = SundayFirstDayCalendar;
SundayFirstDayCalendar.story = {
  name: '1st on Sunday'
};