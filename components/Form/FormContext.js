"use strict";

exports.__esModule = true;
exports.FormContext = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// When not a descendant of a Form, FormContext still provides a basic
// useFormContext that holds the value state.
var useFormContext = function useFormContext(_, valueProp) {
  var _useState = (0, _react.useState)(valueProp),
      value = _useState[0],
      setValue = _useState[1];

  if (valueProp !== undefined && valueProp !== value) setValue(valueProp);
  return [value, function (nextValue) {
    // only set if the caller hasn't supplied a specific value
    if (valueProp === undefined) setValue(nextValue);
  }];
};

var FormContext = _react["default"].createContext({
  useFormContext: useFormContext
});

exports.FormContext = FormContext;