import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Form, FormField, Grommet, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState({
    name: '',
    email: '',
    value: ''
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, {
    value: value,
    onChange: function onChange(nextValue) {
      return setValue(nextValue);
    },
    onSubmit: function onSubmit() {
      return console.log(value);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "value",
    label: "value",
    required: true
  }, /*#__PURE__*/React.createElement(TextArea, {
    name: "value"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "submit"
  }))));
};

storiesOf('TextArea', module).add('Form', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});