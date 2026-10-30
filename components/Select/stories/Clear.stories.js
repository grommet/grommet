"use strict";

exports.__esModule = true;
exports["default"] = exports.Clear = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var options = [];
for (var i = 0; i < 500; i += 1) {
  options.push("Number " + i);
}
var ClearTop = function ClearTop() {
  var _useState = (0, _react.useState)(),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear Options",
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
    clear: true
  }));
};
var ClearBottom = function ClearBottom() {
  var _useState2 = (0, _react.useState)(),
    value = _useState2[0],
    setValue = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Clear Options",
    value: value,
    multiple: true,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    dropHeight: "large",
    clear: {
      position: 'bottom'
    }
  }));
};
var Clear = exports.Clear = function Clear() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(ClearTop, null), /*#__PURE__*/_react["default"].createElement(ClearBottom, null))
    // </Grommet>
  );
};
Clear.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/Select/Clear'
};