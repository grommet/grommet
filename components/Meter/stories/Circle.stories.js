"use strict";

exports.__esModule = true;
exports["default"] = exports.Circle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Circle = exports.Circle = function Circle() {
  var _useState = (0, _react.useState)(20),
    value = _useState[0],
    setValue = _useState[1];
  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      setValue(value < 60 ? value + 8 : 20);
    }, 2000);
    return function () {
      return clearInterval(interval);
    };
  }, [value]);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: value,
        color: value > 50 ? 'status-critical' : 'status-ok'
      }]
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Circle'
};