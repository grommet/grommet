"use strict";

exports.__esModule = true;
exports.FormContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var FormContext = /*#__PURE__*/_react["default"].createContext({
  useFormField: useFormField,
  useFormInput: useFormInput,
  noForm: true
});
exports.FormContext = FormContext;