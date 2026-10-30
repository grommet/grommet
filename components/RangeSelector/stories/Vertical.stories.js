"use strict";

exports.__esModule = true;
exports["default"] = exports.Vertical = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["direction"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SimpleRangeSelector = function SimpleRangeSelector(_ref) {
  var _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([12, 16]),
    range = _useState[0],
    setRange = _useState[1];
  var onChange = function onChange(values) {
    setRange(values);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: direction === 'vertical' ? 'column' : 'row',
      justify: "between"
    }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: value,
        width: "xxsmall",
        height: "xxsmall",
        align: "center",
        pad: "small",
        border: false
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        style: {
          fontFamily: 'monospace'
        }
      }, value));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, _extends({
      direction: direction,
      min: 10,
      max: 20,
      size: "full",
      values: range,
      onChange: onChange
    }, rest))))
    // </Grommet>
  );
};
var Vertical = exports.Vertical = function Vertical() {
  return /*#__PURE__*/_react["default"].createElement(SimpleRangeSelector, {
    direction: "vertical"
  });
};
var _default = exports["default"] = {
  title: 'Input/RangeSelector/Vertical'
};