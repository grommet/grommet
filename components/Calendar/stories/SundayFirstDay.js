"use strict";

exports.__esModule = true;
exports["default"] = exports.SundayFirstDayCalendar = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// When the first day of the month is Sunday, and the request of firstDayOfWeek
// is Monday, we are verifing we are not missing a week, issue 3253.
var SundayFirstDayCalendar = exports.SundayFirstDayCalendar = function SundayFirstDayCalendar() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      firstDayOfWeek: 1,
      date: new Date(2019, 8, 2).toISOString()
    }))
    // </Grommet>
  );
};

SundayFirstDayCalendar.storyName = '1st on Sunday';
var _default = exports["default"] = {
  title: "Visualizations/Calendar/1st on Sunday"
};