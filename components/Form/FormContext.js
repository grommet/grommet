"use strict";

exports.__esModule = true;
exports.FormContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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