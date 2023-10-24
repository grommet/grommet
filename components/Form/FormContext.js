"use strict";

exports.__esModule = true;
exports.FormContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
  useFormInput: useFormInput,
  noForm: true
});