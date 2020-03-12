import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Form, FormField, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes'; // This example shows a way to perform validation across multiple fields.

var Example = function Example() {
  var _React$useState = React.useState({
    name: 'a',
    email: 'b'
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var message = value.name && value.email && value.name[0] !== value.email[0] ? 'Mismatched first character' : undefined;
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(Form, {
    value: value,
    onChange: function onChange(nextValue) {
      return setValue(nextValue);
    },
    onSubmit: function onSubmit(_ref) {
      var nextValue = _ref.value;
      return console.log(nextValue);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name",
    required: true
  }, React.createElement(TextInput, {
    name: "name",
    type: "name"
  })), React.createElement(FormField, {
    label: "Email",
    name: "email",
    required: true
  }, React.createElement(TextInput, {
    name: "email",
    type: "email"
  })), message && React.createElement(Box, {
    pad: {
      horizontal: 'small'
    }
  }, React.createElement(Text, {
    color: "status-error"
  }, message)), React.createElement(Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, React.createElement(Button, {
    type: "reset",
    label: "Reset"
  }), React.createElement(Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

storiesOf('Form', module).add('Aggregate validation', function () {
  return React.createElement(Example, null);
});