import React from 'react';
import { Box, Button, CheckBoxGroup, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
var passwordRulesStrong = [{
  regexp: /(?=.*?[A-Z])/,
  message: 'One uppercase letter',
  status: 'error'
}, {
  regexp: /(?=.*?[a-z])/,
  message: 'One lowercase letter',
  status: 'error'
}, {
  regexp: /(?=.*?[#?!@$ %^&*-])/,
  message: 'One special character',
  status: 'error'
}, {
  regexp: /.{8,}/,
  message: 'At least 8 characters',
  status: 'error'
}];
export var FieldWithChildren = function FieldWithChildren() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(Form, {
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      },
      onValidate: function onValidate(_ref2) {
        var errors = _ref2.errors,
          infos = _ref2.infos;
        return console.log('Validate', errors, infos);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      htmlFor: "name",
      name: "name",
      required: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      "aria-required": true,
      id: "name",
      name: "name"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      htmlFor: "email",
      name: "email",
      required: true
    }, /*#__PURE__*/React.createElement(MaskedInput, {
      "aria-required": true,
      id: "email",
      name: "email",
      mask: [{
        regexp: /^[\w\-_.]+$/,
        placeholder: 'example'
      }, {
        fixed: '@'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'my'
      }, {
        fixed: '.'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'com'
      }]
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Password",
      name: "password",
      htmlFor: "password",
      validate: passwordRulesStrong
    }, /*#__PURE__*/React.createElement(TextInput, {
      name: "password",
      id: "password",
      type: "password"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Subscription options",
      htmlFor: "subscription",
      name: "subscription"
    }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
      name: "subscription",
      id: "subscription",
      options: ['subscribe', 'receive email notifications']
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Time of day",
      htmlFor: "ampm",
      name: "ampm"
    }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      id: "ampm",
      name: "ampm",
      options: ['morning', 'evening']
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/React.createElement(Select, {
      id: "size",
      name: "size",
      multiple: true,
      options: ['small', 'medium', 'large']
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/React.createElement(TextArea, {
      id: "comments",
      name: "comments"
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Age",
      htmlFor: "age",
      name: "age",
      pad: true
    }, /*#__PURE__*/React.createElement(RangeInput, {
      id: "age",
      name: "age",
      min: 15,
      max: 75
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
FieldWithChildren.storyName = 'Field with children';
FieldWithChildren.args = {
  full: true
};
export default {
  title: 'Input/Form/Field with children'
};