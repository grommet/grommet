import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
export var ControlledInput = function ControlledInput() {
  var _useState = useState(''),
    name = _useState[0],
    setName = _useState[1];
  var _useState2 = useState(''),
    email = _useState2[0],
    setEmail = _useState2[1];
  var _useState3 = useState(false),
    subscribe = _useState3[0],
    setSubscribe = _useState3[1];
  var _useState4 = useState(''),
    ampm = _useState4[0],
    setAmpm = _useState4[1];
  var _useState5 = useState(''),
    size = _useState5[0],
    setSize = _useState5[1];
  var _useState6 = useState(''),
    comments = _useState6[0],
    setComments = _useState6[1];
  var _useState7 = useState(''),
    age = _useState7[0],
    setAge = _useState7[1];
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
      onReset: function onReset() {
        setName('');
        setEmail('');
        setSubscribe(false);
        setAmpm('');
        setSize('');
        setComments('');
        setAge('');
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
      value: name,
      onChange: function onChange(event) {
        return setName(event.target.value);
      }
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
      }],
      value: email,
      onChange: function onChange(event) {
        return setEmail(event.target.value);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      htmlFor: "subscribe",
      name: "subscribe"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      name: "subscribe",
      id: "subscribe",
      label: "Subscribe?",
      checked: subscribe,
      onChange: function onChange(event) {
        return setSubscribe(event.target.checked);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Time of day",
      htmlFor: "ampm",
      name: "ampm"
    }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "ampm",
      id: "ampm",
      options: ['morning', 'evening'],
      value: ampm,
      onChange: function onChange(event) {
        return setAmpm(event.target.value);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Size",
      htmlFor: "size",
      name: "size"
    }, /*#__PURE__*/React.createElement(Select, {
      id: "size",
      name: "size",
      options: ['small', 'medium', 'large'],
      value: size,
      onChange: function onChange(event) {
        return setSize(event.option);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Comments",
      htmlFor: "comments",
      name: "comments"
    }, /*#__PURE__*/React.createElement(TextArea, {
      id: "comments",
      name: "comments",
      value: comments,
      onChange: function onChange(event) {
        return setComments(event.target.value);
      }
    })), /*#__PURE__*/React.createElement(FormField, {
      label: "Age",
      htmlFor: "age",
      name: "age",
      pad: true
    }, /*#__PURE__*/React.createElement(RangeInput, {
      id: "age",
      name: "age",
      min: 15,
      max: 75,
      value: age,
      "aria-valuemin": 15,
      "aria-valuemax": 75,
      "aria-valuenow": 30,
      onChange: function onChange(event) {
        return setAge(event.target.value);
      }
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
ControlledInput.storyName = 'Controlled input';
ControlledInput.parameters = {
  // chromatic disabled because snapshot is the same as ControlledInputLazy
  chromatic: {
    disable: true
  }
};
ControlledInput.args = {
  full: true
};
export default {
  title: 'Input/Form/Controlled input'
};