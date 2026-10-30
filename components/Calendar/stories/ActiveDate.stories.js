"use strict";

exports.__esModule = true;
exports["default"] = exports.ActiveDate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ActiveDate = exports.ActiveDate = function ActiveDate() {
  var _useState = (0, _react.useState)(),
    datesD = _useState[0],
    setDatesD = _useState[1];
  var _useState2 = (0, _react.useState)(undefined),
    activeDate = _useState2[0],
    setActiveDate = _useState2[1];
  var startDateButton = (0, _react.useRef)();
  var endDateButton = (0, _react.useRef)();
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      gap: "small",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      ref: startDateButton,
      active: activeDate === 'start',
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Start Date"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datesD && datesD[0][0] && new Date(datesD[0][0]).toDateString())),
      onClick: function onClick() {
        return setActiveDate('start');
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      ref: endDateButton,
      active: activeDate === 'end',
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "End Date"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datesD && datesD[0][1] && new Date(datesD[0][1]).toDateString())),
      onClick: function onClick() {
        return setActiveDate('end');
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      activeDate: activeDate,
      dates: datesD,
      onSelect: function onSelect(arg) {
        setDatesD(arg);
        setActiveDate('end');
      },
      range: "array"
    }))
    // </Grommet>
  );
};
ActiveDate.storyName = 'Active date';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Active date'
};