"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var initialMonth = '2026-03-12T21:09:16.501Z';
var Multiple = exports.Multiple = function Multiple() {
  var _useState = (0, _react.useState)(),
    dates = _useState[0],
    setDates = _useState[1];
  var _useState2 = (0, _react.useState)(initialMonth),
    reference = _useState2[0],
    setReference = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      dates: dates,
      onSelect: function onSelect(date) {
        var nextDates = dates ? [].concat(dates) : [];
        var index = nextDates.indexOf(date);
        if (index === -1) {
          nextDates.push(date);
        } else {
          nextDates.splice(index, 1);
        }
        setDates(nextDates);
        console.log('Select iso date:', date, nextDates);
        console.log('Select utc date:', new Date(date));
      },
      reference: reference,
      onReference: setReference
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Multiple'
};