"use strict";

exports.__esModule = true;
exports.PaginationStep = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Select = require("../Select");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["messages", "onChange", "options", "step"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PaginationStep = exports.PaginationStep = function PaginationStep(_ref) {
  var _theme$pagination;
  var messages = _ref.messages,
    onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [10, 25, 50, 100] : _ref$options,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    formatMessage = _useContext.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    direction: "row",
    align: "center",
    gap: (_theme$pagination = theme.pagination) == null || (_theme$pagination = _theme$pagination.step) == null || (_theme$pagination = _theme$pagination.container) == null ? void 0 : _theme$pagination.gap
  }, rest), /*#__PURE__*/_react["default"].createElement(_Text.Text, null, formatMessage({
    id: 'pagination.stepLabel',
    messages: messages
  })), /*#__PURE__*/_react["default"].createElement(_Select.Select, {
    options: options,
    value: step,
    "aria-label": formatMessage({
      id: 'pagination.stepLabel',
      messages: messages
    }),
    valueLabel: /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.global.input, {
      pad: theme.global.input.padding
    }), /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.global.input.font, step)),
    onChange: onChange
  }));
};