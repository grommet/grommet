function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, FormField, Form, TextArea, Grommet } from 'grommet';

var FormFieldTextArea = function FormFieldTextArea(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "text-area"
  }, props, {
    component: TextArea,
    placeholder: "placeholder"
  })))));
};

storiesOf('Form', module).add('TextArea', function () {
  return /*#__PURE__*/React.createElement(FormFieldTextArea, null);
});