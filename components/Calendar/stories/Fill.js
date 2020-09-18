"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FillCalendar = function FillCalendar() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "large",
    width: "large",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    fill: true,
    daysOfWeek: true
  }))));
};

(0, _react2.storiesOf)('Calendar', module).add('Fill', function () {
  return /*#__PURE__*/_react["default"].createElement(FillCalendar, null);
});