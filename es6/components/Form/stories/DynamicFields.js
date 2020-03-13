import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _useState = useState(),
      haveAlias = _useState[0],
      setHaveAlias = _useState[1];

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
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, React.createElement(FormField, {
    label: "Name",
    name: "name",
    required: true
  }, React.createElement(TextInput, {
    name: "name"
  })), React.createElement(FormField, {
    name: "haveAlias"
  }, React.createElement(CheckBox, {
    name: "haveAlias",
    label: "alias?",
    checked: haveAlias,
    onChange: function onChange() {
      return setHaveAlias(!haveAlias);
    }
  })), haveAlias && React.createElement(FormField, {
    label: "Alias",
    name: "alias",
    required: true
  }, React.createElement(TextInput, {
    name: "alias"
  })), React.createElement(Box, {
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

storiesOf('Form', module).add('Dynamic fields', function () {
  return React.createElement(Example, null);
});