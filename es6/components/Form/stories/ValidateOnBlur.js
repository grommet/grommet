import React from 'react';
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Form, FormField, Select, TextInput } from 'grommet';
export var ValidateOnBlur = function ValidateOnBlur() {
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
      "aria-label": "name",
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
      "aria-label": "email",
      type: "email"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      name: "select-size",
      htmlFor: "select-size__input",
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
      primary: true
    })))))
    // </Grommet>
  );
};

ValidateOnBlur.storyName = 'Validate on blur';
ValidateOnBlur.args = {
  full: true
};
export default {
  title: 'Input/Form/Validate on blur'
};