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
var useFormInput = function useFormInput(_, valueProp, initialValue) {
  var _useState = (0, _react.useState)(valueProp !== undefined ? valueProp : initialValue),
      value = _useState[0],
      setValue = _useState[1];

  return [valueProp !== undefined ? valueProp : value, function (nextValue) {
    if (initialValue !== undefined) setValue(nextValue);
  }];
};

var useFormField = function useFormField(_ref) {
  var error = _ref.error,
      info = _ref.info,
      disabled = _ref.disabled;
  return {
    error: error,
    info: info,
    disabled: disabled
  };
};

var FormContext = /*#__PURE__*/_react["default"].createContext({
  useFormField: useFormField,
  useFormInput: useFormInput
});

exports.FormContext = FormContext;