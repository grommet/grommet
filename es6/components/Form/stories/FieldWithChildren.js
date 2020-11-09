import React from 'react';
import { Box, Button, CheckBoxGroup, Form, FormField, Grommet, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
var passwordRulesStrong = [{
  regexp: new RegExp('(?=.*?[A-Z])'),
  message: 'One uppercase letter',
  status: 'error'
}, {
  regexp: new RegExp('(?=.*?[a-z])'),
  message: 'One lowercase letter',
  status: 'error'
}, {
  regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
  message: 'One special character',
  status: 'error'
}, {
  regexp: new RegExp('.{8,}'),
  message: 'At least 8 characters',
  status: 'error'
}];
export var FieldWithChildren = function FieldWithChildren() {
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
    name: "name",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: "name"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/React.createElement(MaskedInput, {
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
    name: "subscription"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    name: "subscription",
    options: ['subscribe', 'receive email notifications']
  })), /*#__PURE__*/React.createElement(FormField, {
    name: "ampm"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening']
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Size",
    name: "size"
  }, /*#__PURE__*/React.createElement(Select, {
    name: "size",
    multiple: true,
    options: ['small', 'medium', 'large']
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Comments",
    name: "comments"
  }, /*#__PURE__*/React.createElement(TextArea, {
    name: "comments"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, /*#__PURE__*/React.createElement(RangeInput, {
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
  }))))));
};
FieldWithChildren.story = {
  name: 'Field with children'
};