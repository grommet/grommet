"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../../..");
var _SearchBorderBox = require("./SearchBorderBox");
var _excluded = ["searching"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* Need ForwardRef since this functional component
   is being passed into a custom theme for SearchInput
*/
var SearchInput = exports.SearchInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, textInputRef) {
  var searching = _ref.searching,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  (0, _react.useEffect)(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, [textInputRef]);
  return /*#__PURE__*/_react["default"].createElement(_SearchBorderBox.SearchBorderBox, {
    searching: searching
  }, /*#__PURE__*/_react["default"].createElement(_.TextInput, _extends({}, props, {
    plain: true,
    ref: textInputRef
  })));
});