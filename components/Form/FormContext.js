"use strict";

exports.__esModule = true;
exports.FormContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// When not a descendant of a Form, FormContext still provides a basic
// useFormInput. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.
var useFormInput = function useFormInput(_ref) {
  var valueProp = _ref.value,
    initialValue = _ref.initialValue;
  var _useState = (0, _react.useState)(valueProp !== undefined ? valueProp : initialValue),
    value = _useState[0],
    setValue = _useState[1];

  // Returns an array [value and function to set the value]
  return [valueProp !== undefined ? valueProp : value, function (nextValue) {
    if (initialValue !== undefined) setValue(nextValue);
  }];
};
var useFormField = function useFormField(_ref2) {
  var error = _ref2.error,
    info = _ref2.info,
    disabled = _ref2.disabled;
  return {
    error: error,
    info: info,
    disabled: disabled
  };
};
var FormContext = exports.FormContext = /*#__PURE__*/_react["default"].createContext({
  useFormField: useFormField,
  useFormInput: useFormInput
});