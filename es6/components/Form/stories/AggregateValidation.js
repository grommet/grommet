import React from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

// This example shows a way to perform validation across multiple fields.
export var AggregateValidation = function AggregateValidation() {
  var _React$useState = React.useState({
      name: 'a',
      email: 'b'
    }),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var message = value.name && value.email && value.name[0] !== value.email[0] ? 'Mismatched first character' : undefined;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(Form, {
      value: value,
      onChange: function onChange(nextValue) {
        return setValue(nextValue);
      },
      onSubmit: function onSubmit(_ref) {
        var nextValue = _ref.value;
        return console.log(nextValue);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      name: "name",
      required: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      "aria-label": "name",
      name: "name",
      type: "name"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      name: "email",
      required: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      "aria-label": "email",
      name: "email",
      type: "email"
    })), message && /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      color: "status-error"
    }, message)), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {
        return setValue({
          name: '',
          email: ''
        });
      },
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))))
    // </Grommet>
  );
};

AggregateValidation.storyName = 'Aggregate validation';
AggregateValidation.args = {
  full: true
};
export default {
  title: 'Input/Form/Aggregate validation'
};