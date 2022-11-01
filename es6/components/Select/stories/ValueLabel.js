import React, { useState } from 'react';
import { CaretDown } from "grommet-icons/es6/icons/CaretDown";
import { Box, Select } from 'grommet';
export var ValueLabel = function ValueLabel() {
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
      pad: "large"
    }, /*#__PURE__*/React.createElement(Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      },
      plain: true,
      valueLabel: /*#__PURE__*/React.createElement(Box, {
        width: "small",
        overflow: "hidden",
        align: "center",
        border: {
          color: 'dark-3',
          size: 'xsmall',
          style: 'solid',
          side: 'bottom'
        }
      }, value || 'Select...'),
      icon: /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(CaretDown, {
        size: "small",
        color: "black"
      }))
    }))
    // </Grommet>
  );
};

ValueLabel.args = {
  full: true
};
export default {
  title: 'Input/Select/Value Label'
};