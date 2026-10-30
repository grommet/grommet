"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomSizeCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("grommet/utils");
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var customHeading = (0, _utils.deepMerge)(_grommet.grommet, {
  calendar: {
    heading: {
      level: '3'
    }
  }
});
var reference = '2026-04-12T21:09:16.501Z';
var end = new Date(reference);
var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 days ago
var bounds = [start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate(), end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()];
var CustomSizeCalendar = exports.CustomSizeCalendar = function CustomSizeCalendar() {
  var _useState = (0, _react.useState)(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customHeading
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    date: date,
    onSelect: onSelect,
    bounds: bounds,
    reference: reference
  })));
};
CustomSizeCalendar.storyName = 'Heading size';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Custom Themed/Heading size'
};