"use strict";

exports.__esModule = true;
exports["default"] = exports.Busy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Busy = exports.Busy = function Busy() {
  var _useState = (0, _react.useState)(),
    busy = _useState[0],
    setBusy = _useState[1];
  var _useState2 = (0, _react.useState)(),
    success = _useState2[0],
    setSuccess = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    busy: busy,
    success: success,
    label: "Button Busy",
    onClick: function onClick() {
      setBusy(true);
      setTimeout(function () {
        setBusy(false);
        setSuccess(true);
      }, 2000);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    }
  }));
};
Busy.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Button/Busy'
};