import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
var customTheme = deepMerge(grommet, {
  global: {
    input: {
      padding: {
        horizontal: 'small',
        vertical: 'medium'
      }
    }
  },
  textInput: {
    extend: function extend() {
      return "\n      font-size: 20px;\n      background: #c9c19f;\n      width: 300px;\n      margin: 0 auto;\n      \n      &:focus {\n        box-shadow: none;\n        border-color: initial;\n      }\n    ";
    },
    container: {
      extend: function extend() {
        return "\n        background: #edf7d2;\n        height: 100px;\n        width: 400px;\n        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        border-radius: 10px;\n      ";
      }
    },
    placeholder: {
      extend: function extend() {
        return "\n        width: 100%;\n        color: #1e1a11;\n      ";
      }
    },
    suggestions: {
      extend: function extend() {
        return "\n        background: #c9c19f;\n        color: #3d3522;\n        li {\n          border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n        }\n      ";
      }
    }
  }
});

var ThemedTextInput = function ThemedTextInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(TextInput, {
    type: "password",
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions,
    placeholder: /*#__PURE__*/React.createElement("span", null, "Enter something...")
  }))));
};

storiesOf('TextInput', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(ThemedTextInput, null);
});