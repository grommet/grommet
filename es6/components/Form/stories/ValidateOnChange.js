import React, { useState } from 'react';
import { Box, Button, Grommet, Form, FormField, Select } from 'grommet';
import { grommet } from 'grommet/themes';
export var ValidateOnChange = function ValidateOnChange() {
  var _useState = useState(false),
      valid = _useState[0],
      setValid = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    validate: "change",
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    },
    onValidate: function onValidate(validationResults) {
      console.log('validationResults = ', validationResults);
      setValid(validationResults.valid);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "First Name",
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
    name: "lastName",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (lastName) {
      if (lastName && lastName.length === 1) return 'must be >1 character';
      return undefined;
    }]
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Size",
    name: "select-size",
    htmlFor: "select-size",
    required: true,
    validate: function validate(val) {
      if (val === 'small') {
        return {
          message: 'Only 10 left in stock!',
          status: 'info'
        };
      }

      return undefined;
    }
  }, /*#__PURE__*/React.createElement(Select, {
    name: "select-size",
    id: "select-size",
    options: ['small', 'medium', 'large']
  })), /*#__PURE__*/React.createElement(Box, {
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
  }))))));
};
ValidateOnChange.storyName = 'Validate on change';
export default {
  title: 'Input/Form/Validate on change'
};