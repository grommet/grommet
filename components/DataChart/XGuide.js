"use strict";

exports.__esModule = true;
exports.XGuide = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var XGuide = exports.XGuide = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var guide = _ref.guide,
    padArg = _ref.pad,
    thickness = _ref.thickness;
  var pad = padArg;
  if (thickness) {
    // omit any horizontal pad so the guides cover the thickness that
    // is within the pad
    if (typeof padArg === 'object') pad = _extends({}, padArg, {
      top: 'none',
      bottom: 'none'
    });else if (typeof padArg === 'string') pad = {
      horizontal: padArg
    };
  }
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    fill: true,
    direction: "row",
    justify: "between",
    pad: pad,
    responsive: false
  }, Array.from({
    length: guide.x.count
  }).map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_Box.Box, {
        key: i,
        border: "left"
      })
    );
  }));
});