import React, { useState } from 'react'; // When not a descendant of a Form, FormContext still provides a basic
// useFormContext that holds the value state.

var useFormContext = function useFormContext(_, valueProp) {
  var _useState = useState(valueProp),
      value = _useState[0],
      setValue = _useState[1];

  if (valueProp !== undefined && valueProp !== value) setValue(valueProp);
  return [value, function (nextValue) {
    // only set if the caller hasn't supplied a specific value
    if (valueProp === undefined) setValue(nextValue);
  }];
};

export var FormContext = React.createContext({
  useFormContext: useFormContext
});