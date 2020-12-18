import React from 'react';
import { Box, Form, FormField, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var HelpAndError = function HelpAndError() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
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
  })))));
};
HelpAndError.story = {
  name: 'Help and error'
};