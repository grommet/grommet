"use strict";

exports.__esModule = true;
exports["default"] = exports.Themed = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  textArea: {
    extend: function extend() {
      return "\n      font-size: 40px;\n      color: red;\n    ";
    }
  }
});
var Themed = exports.Themed = function Themed() {
  var _useState = (0, _react.useState)(''),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    "aria-label": "custom theme text area",
    value: value,
    onChange: onChange,
    fill: true
  })));
};
var _default = exports["default"] = {
  title: 'Input/TextArea/Custom Themed/Themed'
};