import React, { useEffect, useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, Grommet, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var ControlledInputLazy = function ControlledInputLazy() {
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

  useEffect(function () {
    setName('initial');
    setEmail('initial@my.com');
    setSubscribe(true);
    setAmpm('evening');
    setSize('large');
    setComments('initial');
    setAge(60);
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
    name: "name"
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: "name",
    value: name,
    onChange: function onChange(event) {
      return setName(event.target.value);
    }
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
    }],
    value: email,
    onChange: function onChange(event) {
      return setEmail(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    name: "subscribe"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    name: "subscribe",
    label: "Subscribe?",
    checked: subscribe,
    onChange: function onChange(event) {
      return setSubscribe(event.target.checked);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    name: "ampm"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    name: "ampm",
    options: ['morning', 'evening'],
    value: ampm,
    onChange: function onChange(event) {
      return setAmpm(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Size",
    name: "size"
  }, /*#__PURE__*/React.createElement(Select, {
    name: "size",
    options: ['small', 'medium', 'large'],
    value: size,
    onChange: function onChange(event) {
      return setSize(event.option);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Comments",
    name: "comments"
  }, /*#__PURE__*/React.createElement(TextArea, {
    name: "comments",
    value: comments,
    onChange: function onChange(event) {
      return setComments(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Age",
    name: "age",
    pad: true
  }, /*#__PURE__*/React.createElement(RangeInput, {
    name: "age",
    min: 15,
    max: 75,
    value: age,
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
  }))))));
};
ControlledInputLazy.storyName = 'Controlled input lazy';
export default {
  title: 'Input/Form/Controlled input lazy'
};