import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBoxGroup, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var CheckBoxGroupForm = function CheckBoxGroupForm() {
  var _useState = useState(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    onSubmit: function onSubmit(_ref) {
      var values = _ref.value,
          touched = _ref.touched;
      return (// 'touched' is a single boolean value indication of
        // whether any of the checkboxes had changed.
        console.log('Submit', values, touched)
      );
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "controlled"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    id: "check-box-group-id",
    name: "controlled",
    value: value,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    options: ['Maui', 'Jerusalem', 'Wuhan']
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "Submit"
  }))));
};

storiesOf('CheckBoxGroup', module).add('Form controlled input', function () {
  return /*#__PURE__*/React.createElement(CheckBoxGroupForm, null);
});