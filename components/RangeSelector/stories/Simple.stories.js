"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _RangeSelector = require("../RangeSelector");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Simple = exports.Simple = function Simple() {
  var _useState = (0, _react.useState)([10, 40]),
    range = _useState[0],
    setRange = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "xlarge"
    }, /*#__PURE__*/_react["default"].createElement(_RangeSelector.RangeSelector, {
      min: 0,
      max: 100,
      values: range,
      onChange: function onChange(nextRange) {
        setRange(nextRange);
      }
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Simple'
};