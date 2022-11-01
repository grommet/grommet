import React from 'react';
import { Hide } from "grommet-icons/es6/icons/Hide";
import { View } from "grommet-icons/es6/icons/View";
import { Box, Button, TextInput } from 'grommet';
export var Password = function Password() {
  var _React$useState = React.useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var _React$useState2 = React.useState(false),
    reveal = _React$useState2[0],
    setReveal = _React$useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      width: "medium",
      direction: "row",
      margin: "large",
      align: "center",
      round: "small",
      border: true
    }, /*#__PURE__*/React.createElement(TextInput, {
      plain: true,
      type: reveal ? 'text' : 'password',
      value: value,
      onChange: function onChange(event) {
        return setValue(event.target.value);
      },
      "aria-label": "Input Password"
    }), /*#__PURE__*/React.createElement(Button, {
      icon: reveal ? /*#__PURE__*/React.createElement(View, {
        size: "medium"
      }) : /*#__PURE__*/React.createElement(Hide, {
        size: "medium"
      }),
      onClick: function onClick() {
        return setReveal(!reveal);
      }
    }))
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Password'
};