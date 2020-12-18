import React from 'react';
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var ValidateOnBlur = function ValidateOnBlur() {
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
    validate: "blur",
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Name",
    name: "name",
    required: true,
    validate: [{
      regexp: /^[a-z]/i
    }, function (name) {
      if (name && name.length === 1) return 'must be >1 character';
      return undefined;
    }, function (name) {
      if (name === 'good') return {
        message: /*#__PURE__*/React.createElement(Box, {
          align: "end"
        }, /*#__PURE__*/React.createElement(StatusGood, null)),
        status: 'info'
      };
      return undefined;
    }]
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: "email",
    type: "email"
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
    primary: true
  }))))));
};
ValidateOnBlur.story = {
  name: 'Validate on blur'
};