function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';

var FormFieldHelpError = function FormFieldHelpError(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "text-input"
  }, props, {
    help: "Text to help the user know what is possible",
    error: "Text to call attention to an issue with this field"
  }), /*#__PURE__*/React.createElement(TextInput, {
    id: "text-input",
    placeholder: "placeholder",
    value: "Value",
    onChange: function onChange() {}
  })))));
};

storiesOf('Form', module).add('Help and Error', function () {
  return /*#__PURE__*/React.createElement(FormFieldHelpError, null);
});