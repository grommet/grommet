"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomDayCalendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CustomDayCalendar = function CustomDayCalendar() {
  var calendarContent = [7, 8, 9];

  var _useState = (0, _react.useState)(),
      selectedDay = _useState[0],
      setSelectedDay = _useState[1];

  var onSelect = function onSelect(value) {
    setSelectedDay(value);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4
  }, "Example without onSelect set"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: selectedDay,
    fill: true
  }, function (_ref) {
    var date = _ref.date,
        day = _ref.day,
        isSelected = _ref.isSelected;
    var hasContent = calendarContent.includes(day);
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: isSelected ? 'light-3' : 'white',
      onClick: function onClick() {
        return onSelect(date.toISOString());
      },
      border: true,
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "top-right",
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      align: "center",
      justify: "center",
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, day)), hasContent ? /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Notification, {
        size: "small",
        color: "neutral-3"
      }),
      dropContent: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "small"
      }, "Vacation"),
      dropAlign: {
        top: 'bottom'
      }
    }) : null));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4
  }, "Example with onSelect set"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    onSelect: onSelect,
    date: selectedDay,
    fill: true
  }, function (_ref2) {
    var day = _ref2.day,
        isSelected = _ref2.isSelected;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: isSelected ? 'light-3' : 'white',
      border: true,
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      align: "center",
      justify: "center",
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, day)));
  })));
};

exports.CustomDayCalendar = CustomDayCalendar;
CustomDayCalendar.storyName = 'Custom day';
var _default = {
  title: "Visualizations/Calendar/Custom day"
};
exports["default"] = _default;