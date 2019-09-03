import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hide } from "grommet-icons/es6/icons/Hide";
import { View } from "grommet-icons/es6/icons/View";
import { Box, Grommet, TextInput, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var SimpleTextInput = function SimpleTextInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(TextInput, {
    value: value,
    onChange: onChange
  }))));
};

var PasswordInput = function PasswordInput() {
  var _React$useState2 = React.useState(''),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      reveal = _React$useState3[0],
      setReveal = _React$useState3[1];

  return React.createElement(Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, React.createElement(TextInput, {
    plain: true,
    type: reveal ? 'text' : 'password',
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }), React.createElement(Button, {
    icon: reveal ? React.createElement(View, {
      size: "medium"
    }) : React.createElement(Hide, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var SuggestionsTextInput = function SuggestionsTextInput() {
  var _React$useState4 = React.useState(''),
      value = _React$useState4[0],
      setValue = _React$useState4[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(TextInput, {
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions
  }))));
};

var customTheme = deepMerge(grommet, {
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
  var _React$useState5 = React.useState(''),
      value = _React$useState5[0],
      setValue = _React$useState5[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return React.createElement(Grommet, {
    full: true,
    theme: customTheme
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Box, {
    width: "medium"
  }, React.createElement(TextInput, {
    type: "password",
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions,
    placeholder: React.createElement("span", null, "Enter something...")
  }))));
};

storiesOf('TextInput', module).add('Simple', function () {
  return React.createElement(SimpleTextInput, null);
}).add('Password', function () {
  return React.createElement(PasswordInput, null);
}).add('Suggestions', function () {
  return React.createElement(SuggestionsTextInput, null);
}).add('Themed', function () {
  return React.createElement(ThemedTextInput, null);
});