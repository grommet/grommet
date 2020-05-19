function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, CheckBox, CheckBoxGroup, Form, FormField, Grommet } from 'grommet';

var FormFieldCheckBox = function FormFieldCheckBox(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value,
          touched = _ref.touched;
      return console.log('Submit', value, touched);
    }
  }, /*#__PURE__*/React.createElement(FormField, _extends({
    label: "Toggle",
    name: "toggle",
    htmlFor: "check-box-toggle"
  }, props), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(CheckBox, {
    id: "check-box-toggle",
    name: "toggle",
    label: "CheckBox",
    toggle: true
  }))), /*#__PURE__*/React.createElement(FormField, {
    label: "Default",
    name: "checkbox",
    htmlFor: "check-box",
    required: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(CheckBox, {
    id: "check-box",
    name: "checkbox",
    label: "Required"
  }))), /*#__PURE__*/React.createElement(FormField, {
    label: "Where would you like to visit",
    name: "checkboxgroup",
    htmlFor: "check-box-group",
    required: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    id: "group",
    name: "checkboxgroup",
    options: ['Maui', 'Jerusalem', 'Wuhan']
  }))), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit"
  }))));
};

storiesOf('Form', module).add('CheckBox', function () {
  return /*#__PURE__*/React.createElement(FormFieldCheckBox, null);
});