import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Form, FormField, CheckBox, Grommet } from 'grommet';

var FormFieldCheckBox = function FormFieldCheckBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Form, null, React.createElement(FormField, {
    label: "Label",
    name: "checkbox",
    htmlFor: "check-box",
    required: true
  }, React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, React.createElement(CheckBox, {
    id: "check-box",
    name: "checkbox",
    label: "CheckBox"
  }))), React.createElement(Button, {
    type: "submit",
    label: "Submit"
  }))));
};

storiesOf('Form', module).add('CheckBox', function () {
  return React.createElement(FormFieldCheckBox, null);
});