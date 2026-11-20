// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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

// When a FormField is disabled, its error should be suppressed. This mirrors
// the behavior of the useFormField() provided by Form, so that a disabled
// FormField behaves the same whether or not it is inside a Form. The info is
// intentionally left alone.
const useFormField = ({ error, info, disabled }) => ({
  error: disabled ? undefined : error,
  info,
  disabled,
});

export const FormContext = React.createContext({
  useFormField,
  useFormInput,
});
