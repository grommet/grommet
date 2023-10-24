import React, { useState } from 'react';
import { Box, Button, Form, FormField, Text, TextArea } from 'grommet';
export var InsideFormField = function InsideFormField() {
  var _useState = useState({
      name: '',
      email: '',
      value: ''
    }),
    value = _useState[0],
    setValue = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "TextArea as component prop of FormField"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
      label: "FormField label",
      htmlFor: "text-area",
      component: TextArea,
      placeholder: "placeholder from FormField"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "submit"
    }))), /*#__PURE__*/React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "TextArea inside FormField"), /*#__PURE__*/React.createElement(Form, {
      value: value,
      onChange: function onChange(nextValue) {
        return setValue(nextValue);
      },
      onSubmit: function onSubmit() {
        return console.log(value);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      name: "value",
      label: "FormField label",
      required: true
    }, /*#__PURE__*/React.createElement(TextArea, {
      name: "value",
      placeholder: "placeholder from TextArea"
    })), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "submit"
    }))))
    // </Grommet>
  );
};

InsideFormField.storyName = 'Inside a FormField';
export default {
  title: 'Input/TextArea/Inside a FormField'
};