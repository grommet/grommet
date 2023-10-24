import React from 'react';
import { Box, TextInput } from 'grommet';
export var Uncontrolled = function Uncontrolled() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }, /*#__PURE__*/React.createElement(TextInput, {
      onChange: function onChange(event) {
        return console.log('Change', event.target.value);
      },
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextInput/Uncontrolled'
};