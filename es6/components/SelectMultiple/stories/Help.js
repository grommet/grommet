import React, { useState } from 'react';
import { Box } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
var options = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
export var Help = function Help() {
  var _useState = useState([]),
    valueMultiple = _useState[0],
    setValueMultiple = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/React.createElement(SelectMultiple, {
      value: valueMultiple,
      placeholder: "Select",
      options: options,
      help: "something helpful",
      onChange: function onChange(_ref) {
        var value = _ref.value;
        return setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};

Help.parameters = {
  chromatic: {
    disable: true
  }
};
Help.args = {
  full: true
};
export default {
  title: 'Input/SelectMultiple/Help'
};