import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

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
    onReset: function onReset(event) {
      console.log(event);
      setValue('');
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name"
  }, React.createElement(TextInput, {
    name: "name",
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  })), React.createElement(Box, {
    direction: "row",
    justify: "between",
    margin: {
      top: 'medium'
    }
  }, React.createElement(Button, {
    label: "Cancel"
  }), React.createElement(Button, {
    type: "reset",
    label: "Reset"
  }), React.createElement(Button, {
    type: "submit",
    label: "Update",
    primary: true
  }))))));
};

storiesOf('Form', module).add('Controlled Input', function () {
  return React.createElement(Example, null);
});