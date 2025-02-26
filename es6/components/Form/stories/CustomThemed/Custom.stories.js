import React from 'react';
import { Box, Button, CheckBox, Form, FormField, Grommet, MaskedInput, RadioButtonGroup, RangeInput, Select, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = {
  global: {
    font: {
      size: '16px'
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: 'dark-2',
      size: 'small',
      margin: 'xsmall',
      weight: 600
    },
    border: {
      position: 'outer',
      side: 'all'
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: true
      }
    },
    content: {
      pad: 'small'
    },
    error: {
      background: {
        color: 'status-critical',
        opacity: 'weak'
      }
    },
    margin: 'none'
  }
};
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: deepMerge(grommet, customTheme)
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
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "name",
    label: "Name",
    name: "name",
    required: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "name",
    "aria-required": true,
    name: "name"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "email",
    label: "Email",
    name: "email",
    required: true
  }, /*#__PURE__*/React.createElement(MaskedInput, {
    name: "email",
    id: "email",
    "aria-required": true,
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
    htmlFor: "subscribe",
    name: "subscribe"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    id: "subscribe",
    name: "subscribe",
    label: "Subscribe?"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "ampm",
    name: "ampm"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "ampm",
    name: "ampm",
    options: ['morning', 'evening']
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "size",
    label: "Size",
    name: "size"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "size",
    name: "size",
    options: ['small', 'medium', 'large']
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "comments",
    label: "Comments",
    name: "comments",
    disabled: true
  }, /*#__PURE__*/React.createElement(TextArea, {
    id: "comments",
    name: "comments",
    disabled: true
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "age",
    label: "Age",
    name: "age"
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
  }))))));
};
export default {
  title: 'Input/Form/Custom Themed/Custom'
};