function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Form, FormField, CheckBox, Grommet } from 'grommet';

var FormFieldCheckBox = function FormFieldCheckBox(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, React.createElement(FormField, _extends({
    label: "Toggle",
    name: "toggle",
    htmlFor: "check-box-toggle"
  }, props), React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, React.createElement(CheckBox, {
    id: "check-box-toggle",
    name: "toggle",
    label: "CheckBox",
    toggle: true
  }))), React.createElement(FormField, {
    label: "Default",
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