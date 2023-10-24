import React, { useState } from 'react';
import { Box, SelectMultiple, Text } from 'grommet';
var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
export var SelectMultipleLimited = function SelectMultipleLimited() {
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
    }, /*#__PURE__*/React.createElement(Text, null, "SelectMultiple Limited"), /*#__PURE__*/React.createElement(SelectMultiple, {
      limit: 5,
      help: /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        justify: "between",
        flex: false,
        pad: {
          horizontal: 'xsmall',
          bottom: 'xsmall'
        }
      }, /*#__PURE__*/React.createElement(Text, {
        size: "small"
      }, "Select up to 5")),
      value: valueMultiple,
      placeholder: "Select",
      options: defaultOptions,
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};

SelectMultipleLimited.parameters = {
  chromatic: {
    disable: true
  }
};
SelectMultipleLimited.args = {
  full: true
};
SelectMultipleLimited.storyName = 'Limited';
export default {
  title: 'Input/SelectMultiple/Limited'
};