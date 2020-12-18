import React from 'react';
import { Box, Grommet, Select } from 'grommet';
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
  }, /*#__PURE__*/React.createElement(Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    options: ['one', 'two'],
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return console.log(option);
    }
  })));
};
Uncontrolled.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};