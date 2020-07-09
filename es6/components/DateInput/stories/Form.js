import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, DateInput, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _React$useState = React.useState({
    value: ''
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(nextValue) {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit(_ref) {
      var nextValue = _ref.value;
      return console.log(nextValue);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    name: "value",
    label: "value",
    required: true
  }, /*#__PURE__*/React.createElement(DateInput, {
    name: "value",
    format: "mm/dd/yyyy"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    label: "submit"
  }))));
};

storiesOf('DateInput', module).add('Form', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});