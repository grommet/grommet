import React from 'react';
import { Box, Button, RadioButton } from 'grommet';
export var Simple = function Simple() {
  var _React$useState = React.useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  }));
};
export default {
  title: 'Input/RadioButton/Simple'
};