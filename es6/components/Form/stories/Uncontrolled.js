import React from 'react';
import { Box, Button, CheckBox, Form, FormField, FileInput, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
var suggestions = ['Shimi', 'Eric'];
export var Uncontrolled = function Uncontrolled() {
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
      onChange: function onChange(value) {
        return console.log('Change', value);
      },
      onSubmit: function onSubmit(event) {
        return console.log('Submit', event.value, event.touched);
      }
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      htmlFor: "name",
      name: "name"
    }, /*#__PURE__*/React.createElement(TextInput, {
      id: "name",
      name: "name",
      suggestions: suggestions
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Email",
      htmlFor: "email",
      name: "email",
      required: true
    }, /*#__PURE__*/React.createElement(MaskedInput, {
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
      name: "subscribe"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      name: "subscribe",
      label: "Subscribe?"
    })), /*#__PURE__*/React.createElement(FormField, {
      name: "ampm"
    }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "ampm",
      options: ['morning', 'evening']
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/React.createElement(Select, {
      id: "size",
      "aria-label": "size",
      name: "size",
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
    })), /*#__PURE__*/React.createElement(FormField, {
      required: true,
      label: "Image",
      htmlFor: "image",
      name: "image"
    }, /*#__PURE__*/React.createElement(FileInput, {
      id: "image",
      name: "image"
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

Uncontrolled.args = {
  full: true
};
export default {
  title: 'Input/Form/Uncontrolled'
};