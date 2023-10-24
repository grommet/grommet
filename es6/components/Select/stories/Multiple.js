import React, { useState } from 'react';
import { Box, Select } from 'grommet';
var options = ['one', 'two'];
export var Multiple = function Multiple() {
  var _useState = useState(['one']),
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
      pad: "large"
    }, /*#__PURE__*/React.createElement(Select, {
      placeholder: "Select",
      multiple: true,
      closeOnChange: false,
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var nextValue = _ref.value;
        return setValue(nextValue);
      }
    }))
    // </Grommet>
  );
};

Multiple.parameters = {
  chromatic: {
    disable: true
  }
};
Multiple.args = {
  full: true
};
export default {
  title: 'Input/Select/Multiple'
};