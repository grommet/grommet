import React, { useState } from 'react';
import { Box, Select } from 'grommet';
export var Simple = function Simple() {
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
    }, /*#__PURE__*/React.createElement(Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      }
    }))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Input/Select/Simple'
};