import React from 'react';
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Form, FormField, Heading } from 'grommet';
export var TriggerValidationUsingFormField = function TriggerValidationUsingFormField() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    alignSelf: "center",
    level: "2"
  }, "Validate On"), /*#__PURE__*/React.createElement(Form, {
    onReset: function onReset(event) {
      return console.log(event);
    },
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log('Submit', value);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Blur",
    name: "blur",
    "aria-label": "blur",
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
    }],
    validateOn: "blur"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Submit",
    name: "submit",
    "aria-label": "submit",
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
    }],
    validateOn: "submit"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Change",
    name: "change",
    "aria-label": "change",
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
    }],
    validateOn: "change"
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
    primary: true
  })))));
};
TriggerValidationUsingFormField.storyName = 'Trigger Validation using Form Field';
export default {
  title: 'Input/Form/Trigger Validation using Form Field'
};