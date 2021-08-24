import React, { useState } from 'react'; // When not a descendant of a Form, FormContext still provides a basic
// useFormInput. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.

var useFormInput = function useFormInput(_, valueProp, initialValue) {
  var _useState = useState(valueProp !== undefined ? valueProp : initialValue),
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

export var FormContext = /*#__PURE__*/React.createContext({
  useFormField: useFormField,
  useFormInput: useFormInput
});