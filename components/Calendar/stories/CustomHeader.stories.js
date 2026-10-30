"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomHeaderCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var reference = '2026-04-12T21:09:16.501Z';
var end = new Date(reference);
var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 days ago
var bounds = [start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate(), end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()];
var CustomHeaderCalendar = exports.CustomHeaderCalendar = function CustomHeaderCalendar() {
  var _useState = (0, _react.useState)(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: bounds,
      reference: reference,
      header: function header(_ref) {
        var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          onNextMonth = _ref.onNextMonth,
          previousInBound = _ref.previousInBound,
          nextInBound = _ref.nextInBound;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !previousInBound,
          onClick: onPreviousMonth
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPreviousLink, null))), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          size: "small"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !nextInBound,
          onClick: onNextMonth
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNextLink, null))));
      }
    }))
    // </Grommet>
  );
};
CustomHeaderCalendar.storyName = 'Header';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Header'
};