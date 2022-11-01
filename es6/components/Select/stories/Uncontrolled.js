import React from 'react';
import { Box, Select } from 'grommet';
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
    }, /*#__PURE__*/React.createElement(Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      options: ['one', 'two'],
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return console.log(option);
      }
    }))
    // </Grommet>
  );
};

Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
Uncontrolled.args = {
  full: true
};
export default {
  title: 'Input/Select/Uncontrolled'
};