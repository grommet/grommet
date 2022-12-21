import React, { useState } from 'react';

// When not a descendant of a Form, FormContext still provides a basic
// useFormInput. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.
var useFormInput = function useFormInput(_ref) {
  var valueProp = _ref.value,
    initialValue = _ref.initialValue;
  var _useState = useState(valueProp !== undefined ? valueProp : initialValue),
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
export var FormContext = /*#__PURE__*/React.createContext({
  useFormField: useFormField,
  useFormInput: useFormInput,
  noForm: true
});