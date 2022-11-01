import React, { useCallback, useState } from 'react';
import { Box, Button, Form, FormField } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
var options = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
export var InsideFormField = function InsideFormField() {
  var _useState = useState({}),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = useCallback(function (nextValue) {
    return setValue(nextValue);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Form, {
      value: value,
      onChange: onChange,
      onSubmit: function onSubmit() {
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Label",
      name: "select"
    }, /*#__PURE__*/React.createElement(SelectMultiple, {
      showSelectedInline: true,
      name: "select",
      placeholder: "placeholder",
      options: options
    })), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))
    // </Grommet>
  );
};

InsideFormField.parameters = {
  chromatic: {
    disable: true
  }
};
InsideFormField.storyName = 'Inside a FormField';
export default {
  title: 'Input/SelectMultiple/Inside a FormField'
};