"use strict";

exports.__esModule = true;
exports["default"] = exports.Pinned = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var locations = ['Los Angelos', 'Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'Pheonix', 'San Francisco', 'Trenton'];
var pinnedLocations = ['Los Angelos', 'Fort Collins', 'Palo Alto', 'Pheonix', 'Trenton'];
var Pinned = exports.Pinned = function Pinned() {
  var _useState = (0, _react.useState)(locations),
    ordered = _useState[0],
    setOrder = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    "aria-label": "pinned list",
    data: ordered,
    onOrder: setOrder,
    pinned: pinnedLocations
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/List/Pinned'
};