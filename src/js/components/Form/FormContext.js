import React, { useEffect, useState } from 'react';

// When not a descendant of a Form, FormContext still provides a basic
// useFormContext that holds the value state.
const useFormContext = (_, valueProp) => {
  const [value, setValue] = useState(valueProp !== undefined ? valueProp : '');
  // use whatever value is passed in, even when it changes
  useEffect(() => setValue(valueProp), [valueProp]);
  return [value, setValue];
};

export const FormContext = React.createContext({ useFormContext });
