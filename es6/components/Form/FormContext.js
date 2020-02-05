import React, { useEffect, useState } from 'react'; // When not a descendant of a Form, FormContext still provides a basic
// useFormContext that holds the value state.

var useFormContext = function useFormContext(_, valueProp) {
  var _useState = useState(valueProp !== undefined ? valueProp : ''),
      value = _useState[0],
      setValue = _useState[1]; // use whatever value is passed in, even when it changes


  useEffect(function () {
    return setValue(valueProp);
  }, [valueProp]);
  return [value, setValue];
};

export var FormContext = React.createContext({
  useFormContext: useFormContext
});