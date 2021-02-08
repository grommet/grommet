import React from 'react';
import { Box, Button, Form, FormField, Grommet, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  formField: {
    label: {
      requiredIndicator: true
    }
  }
});
export var RequiredLabel = function RequiredLabel() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
    name: "firstName",
    htmlFor: "firstName",
    label: "First Name",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "firstName",
    name: "firstName"
  })), /*#__PURE__*/React.createElement(FormField, {
    name: "lastName",
    htmlFor: "lastName",
    label: "Last Name",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "lastName",
    name: "lastName"
  })), /*#__PURE__*/React.createElement(FormField, {
    name: "email",
    htmlFor: "email",
    label: "Email",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "email",
    name: "email",
    type: "email"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit",
    primary: true
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      left: 'small'
    },
    size: "small",
    color: "status-critical"
  }, "* Required Field"))));
};
RequiredLabel.storyName = 'Required label';
export default {
  title: 'Input/Form/Required label'
};