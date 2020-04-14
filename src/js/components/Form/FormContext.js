import React, { useEffect, useState } from 'react';

// When not a descendant of a Form, FormContext still provides a basic
// useFormContext. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.
const useFormContext = (_, valueProp, initialValue) => {
  const [value, setValue] = useState(
    valueProp !== undefined ? valueProp : initialValue,
  );
  useEffect(() => {
    if (valueProp !== value && valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [value, valueProp]);
  return [
    value,
    nextValue => {
      if (initialValue !== undefined) setValue(nextValue);
    },
  ];
};

export const FormContext = React.createContext({ useFormContext });
