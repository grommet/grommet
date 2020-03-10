import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hide } from "grommet-icons/es6/icons/Hide";
import { View } from "grommet-icons/es6/icons/View";
import { Box, TextInput, Button } from 'grommet';

var PasswordInput = function PasswordInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = React.useState(false),
      reveal = _React$useState2[0],
      setReveal = _React$useState2[1];

  return React.createElement(Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, React.createElement(TextInput, {
    plain: true,
    type: reveal ? 'text' : 'password',
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }), React.createElement(Button, {
    icon: reveal ? React.createElement(View, {
      size: "medium"
    }) : React.createElement(Hide, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

storiesOf('TextInput', module).add('Password', function () {
  return React.createElement(PasswordInput, null);
});