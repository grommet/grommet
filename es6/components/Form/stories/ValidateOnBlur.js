import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { grommet } from 'grommet/themes';

var Example = function Example() {
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
    validate: "blur",
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
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (name) {
      if (name && name.length === 1) return 'must be >1 character';
      return undefined;
    }, function (name) {
      if (name === 'good') return {
        message: React.createElement(Box, {
          align: "end"
        }, React.createElement(StatusGood, null)),
        status: 'info'
      };
      return undefined;
    }]
  }), React.createElement(FormField, {
    label: "Email",
    name: "email",
    required: true
  }, React.createElement(TextInput, {
    name: "email",
    type: "email"
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

storiesOf('Form', module).add('Validate on blur', function () {
  return React.createElement(Example, null);
});