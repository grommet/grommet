import React from 'react';
import { Box, RadioButton } from 'grommet';
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: true,
    disabled: true
  }));
};
export default {
  title: 'Input/RadioButton/Disabled'
};