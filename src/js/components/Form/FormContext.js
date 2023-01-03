import React, { useState } from 'react';

// When not a descendant of a Form, FormContext still provides a basic
// useFormInput. It doesn't do anything for components like TextInput.
// But, it does store the value for components like CheckBox or Select
// where the grommet component needs to know the value in order to
// render custom visuals.
const useFormInput = ({ value: valueProp, initialValue }) => {
  const [value, setValue] = useState(
    valueProp !== undefined ? valueProp : initialValue,
  );

  // Returns an array [value and function to set the value]
  return [
    valueProp !== undefined ? valueProp : value,
    (nextValue) => {
      if (initialValue !== undefined) setValue(nextValue);
    },
  ];
};

const useFormField = ({ error, info, disabled }) => ({ error, info, disabled });

export const FormContext = React.createContext({
  useFormField,
  useFormInput,
  noForm: true,
});
