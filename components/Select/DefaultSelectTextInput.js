"use strict";

exports.__esModule = true;
exports.DefaultSelectTextInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledSelect = require("./StyledSelect");
var _excluded = ["disabled", "id"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DefaultSelectTextInput = exports.DefaultSelectTextInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var disabled = _ref.disabled,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectTextInput
  // When Select is disabled, we want to show a default cursor
  // but not have disabled styling come from TextInput
  // Disabled can be a bool or an array of options to disable.
  // We only want to disable the TextInput if the control
  // button should be disabled which occurs when disabled
  // equals true.
  , _extends({
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
    id: id ? id + "__input" : undefined,
    ref: ref
  }, rest, {
    tabIndex: "-1",
    type: "text",
    plain: true,
    readOnly: true
  }));
});