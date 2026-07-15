import React from 'react';
import { Box, Button, DateInput, Form, FormField } from 'grommet';
export var DateForm = function DateForm() {
  var _React$useState = React.useState({
      value: ''
    }),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(nextValue) {
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue.value));
    setValue(nextValue);
  };
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit(_ref) {
      var nextValue = _ref.value;
      console.log(nextValue);
      setValue({
        value: ''
      });
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "value",
    label: "value",
    required: true
  }, /*#__PURE__*/React.createElement(DateInput, {
    name: "value",
    format: "mm/dd/yyyy"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "submit"
  })));
};
DateForm.storyName = 'Form';
export default {
  title: 'Input/DateInput/Form'
};