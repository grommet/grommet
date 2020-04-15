import React, { useState } from 'react'; // When not a descendant of a Form, FormContext still provides a basic
// useFormContext. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.

var useFormContext = function useFormContext(_, valueProp, initialValue) {
  var _useState = useState(valueProp !== undefined ? valueProp : initialValue),
      value = _useState[0],
      setValue = _useState[1];

  return [valueProp !== undefined ? valueProp : value, function (nextValue) {
    if (initialValue !== undefined) setValue(nextValue);
  }];
};

export var FormContext = React.createContext({
  useFormContext: useFormContext
});