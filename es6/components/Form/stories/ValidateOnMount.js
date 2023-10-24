import React, { useState } from 'react';
import { Box, Button, Form, FormField } from 'grommet';
export var ValidateOnMount = function ValidateOnMount() {
  var defaultValue = {
    firstName: 'J',
    lastName: ''
  };
  var _useState = useState(false),
    valid = _useState[0],
    setValid = _useState[1];
  var _useState2 = useState(defaultValue),
    value = _useState2[0],
    setValue = _useState2[1];
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
      validate: "change",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onChange: function onChange(nextValue, _ref) {
        var touched = _ref.touched;
        console.log('Change', nextValue, touched);
        setValue(nextValue);
      },
      onValidate: function onValidate(validationResults) {
        console.log('validationResults = ', validationResults);
        setValid(validationResults.valid);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "First Name",
      htmlFor: "firstName",
      id: "firstName",
      name: "firstName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (firstName) {
        if (firstName && firstName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Last Name",
      htmlFor: "lastName",
      id: "lastName",
      name: "lastName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (lastName) {
        if (lastName && lastName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Cancel"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Update",
      disabled: !valid,
      primary: true
    })))))
    // </Grommet>
  );
};

ValidateOnMount.storyName = 'Validate on mount';
ValidateOnMount.args = {
  full: true
};
export default {
  title: 'Input/Form/Validate on mount'
};