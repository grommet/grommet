"use strict";

exports.__esModule = true;
exports["default"] = exports.ShowAdjacent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Box = require("../../Box");
var _Main = require("../../Main");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var Container = function Container(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    align: "center",
    border: true,
    gap: "small",
    pad: "medium"
  }, rest));
};
var ShowAdjacent = exports.ShowAdjacent = function ShowAdjacent() {
  var _useState = (0, _react.useState)(new Date(2020, 6, 15).toISOString()),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_Main.Main, null, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: {
        count: 'fit',
        size: ['small', 'auto']
      },
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = false"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: false
    })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = true"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13']
    })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = \"trim\""), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: "trim"
    }))))
    // </Grommet>
  );
};
ShowAdjacent.storyName = 'Show adjacent days';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Show adjacent days'
};