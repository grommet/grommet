import React from 'react';
import { Box, Form, FormField, Text, TextInput } from 'grommet';
export var HelpAndError = function HelpAndError() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
      label: "Label",
      htmlFor: "text-input",
      help: "Text to help the user know what is possible",
      error: "Text to call attention to an issue with this field"
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "text-input",
      placeholder: "placeholder",
      value: "Value",
      onChange: function onChange() {}
    }))), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      htmlFor: "email",
      help: /*#__PURE__*/React.createElement(Text, {
        weight: "lighter",
        size: "small"
      }, "Text to help the user know what is possible"),
      error: /*#__PURE__*/React.createElement(Box, {
        align: "center",
        background: "background-front"
      }, /*#__PURE__*/React.createElement(Text, {
        weight: "bolder",
        align: "center",
        size: "small"
      }, "Custom Text to call attention to an issue with this field"))
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "email",
      value: "jane@hpe",
      onChange: function onChange() {}
    }))))
    // </Grommet>
  );
};

HelpAndError.storyName = 'Help and error';
export default {
  title: 'Input/Form/Help and error'
};