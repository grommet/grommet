import React, { useState } from 'react';
import { Box, Select, Text } from 'grommet';
export var Disabled = function Disabled() {
  var options = ['one', 'two'];
  var _useState = useState(''),
    value = _useState[0],
    setValue = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Disabled"), /*#__PURE__*/React.createElement(Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      },
      disabled: true
    }))
    // </Grommet>
  );
};

Disabled.args = {
  full: true
};
export default {
  title: 'Input/Select/Disabled'
};