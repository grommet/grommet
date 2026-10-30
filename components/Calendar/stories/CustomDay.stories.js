"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomDayCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var CustomDayCalendar = exports.CustomDayCalendar = function CustomDayCalendar() {
  var calendarContent = [7, 8, 9];
  var _useState = (0, _react.useState)(),
    selectedDay = _useState[0],
    setSelectedDay = _useState[1];
  var onSelect = function onSelect(value) {
    setSelectedDay(value);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
        pad: "small",
        align: "center",
        justify: "center",
        fill: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "large"
      }, day)));
    })))
    // </Grommet>
  );
};
CustomDayCalendar.storyName = 'Custom day';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Custom day'
};