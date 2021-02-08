import React, { useEffect, useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, Grommet, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
var defaultValue = {
  name: '',
  email: '',
  subscribe: false,
  ampm: '',
  size: '',
  comments: '',
  age: ''
};
export var ControlledLazy = function ControlledLazy() {
  var _useState = useState(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    return setValue({
      name: 'initial',
      email: 'initial@my.com',
      subscribe: true,
      ampm: 'evening',
      size: 'large',
      comments: 'initial',
      age: 60
    });
  }, []);
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
    value: value,
    onChange: function onChange(nextValue) {
      console.log('Change', nextValue);
      setValue(nextValue);
    },
    onReset: function onReset() {
      return setValue(defaultValue);
    },
    onSubmit: function onSubmit(event) {
      return console.log('Submit', event.value, event.touched);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Name",
    name: "name"
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
    name: "size"
  }, /*#__PURE__*/React.createElement(Select, {
    name: "size",
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
ControlledLazy.storyName = 'Controlled lazy';
ControlledLazy.parameters = {
  // chromatic disabled because snapshot is the same as Controlled
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/Form/Controlled lazy'
};