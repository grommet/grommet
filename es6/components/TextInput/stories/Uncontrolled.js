import React from 'react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var Uncontrolled = function Uncontrolled() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(TextInput, {
    onChange: function onChange(event) {
      return console.log('Change', event.target.value);
    }
  }))));
};
Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextInput/Uncontrolled'
};